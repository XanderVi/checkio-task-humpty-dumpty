//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            var strInput = checkioInput[0] + ", " + checkioInput[1];

            if (data.error) {
                $content.find('.call').html('Fail: spheroid(' + strInput + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];


            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: spheroid(' + strInput + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: spheroid(' + strInput + ')');
                $content.find('.answer').remove();
            }

            if (explanation) {
                var canvas = new SpheroidCanvas();
                canvas.createCanvas($content.find(".explanation")[0], checkioInput[0], checkioInput[1]);
//            canvas.animateCanvas();
            }

            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//                e.stopPropagation();
//                return false;
//            });
//        });


        function SpheroidCanvas(options) {
            options = options || {};
            var format = Raphael.format;

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var x0 = 10,
                y0 = 10,
                field = 320,
                margin = 40;

            var paper;

            var attrOuter = {"stroke": colorBlue4, "stroke-width": 3, "fill": "r#FFFFFF-#8FC7ED"};
            var attrNear = {"stroke": colorBlue4, "stroke-width": 2, "stroke-dasharray": ""};
            var attrAxis = {"stroke": colorBlue4, "stroke-width": 1, "stroke-dasharray": "- "};
            var attrFar = {"stroke": colorBlue4, "stroke-width": 1, "stroke-dasharray": "-"};
            var attrMeasureLine = {"stroke": colorGrey4, "stroke-width": 2};
            var attrData = {"stroke": colorBlue4, "font-size": 20, "font-family": "Verdana"};

            var outer, nearVert, nearHoriz, farVert, farHoriz, axisVert, axisHoriz;
            var measureVtop, measureVlow, measureVcon, measureHleft, measureHright, measureHcon;
            var measureV, measureH;

            var unit, cx, cy;

            this.createCanvas = function (dom, height, width) {
                this.width = width;
                this.height = height;
                unit = Math.min(field / 4, field / Math.max(height, width));
                cx = x0 + field / 2;
                cy = y0 + field / 2;
                paper = Raphael(dom, x0 * 2 + field + margin, x0 * 2 + field + margin);

                measureVtop = paper.path(format("M{0},{1}H{2}",
                    cx, cy - unit * height / 2, 2.5 * x0 + field
                )).attr(attrMeasureLine);
                measureVlow = paper.path(format("M{0},{1}H{2}",
                    cx, cy + unit * height / 2, 2.5 * x0 + field
                )).attr(attrMeasureLine);
                measureVcon = paper.path(format("M{0},{1}V{2}",
                    2 * x0 + field,
                    cy - unit * height / 2,
                    cy + unit * height / 2
                )).attr(attrMeasureLine).attr({"arrow-end": "classical", "arrow-start": "classical"});
                measureV = paper.text(x0 * 2 + field + margin / 2, cy, height).attr(attrData);

                measureHleft = paper.path(format("M{0},{1}V{2}",
                    cx - unit * width / 2, cy, 4.5 * y0 + field
                )).attr(attrMeasureLine);
                measureHright = paper.path(format("M{0},{1}V{2}",
                    cx + unit * width / 2, cy, 4.5 * y0 + field
                )).attr(attrMeasureLine);
                measureHcon = paper.path(format("M{0},{1}H{2}",
                    cx - unit * width / 2,
                    4 * y0 + field,
                    cx + unit * width / 2
                )).attr(attrMeasureLine).attr({"arrow-end": "classical", "arrow-start": "classical"});
                measureH = paper.text(cx, y0 * 2.5 + field, width).attr(attrData);

                outer = paper.ellipse(cx, cy, unit * width / 2, unit * height / 2).attr(attrOuter);

                nearVert = paper.path(
                    format("M{0},{1}A{2},{3},0,0,0,{0},{4}",
                        cx,
                        cy - unit * height / 2,
                        unit * width / 8,
                        unit * height / 2,
                        cy + unit * height / 2
                    )).attr(attrNear);

                farVert = paper.path(
                    format("M{0},{1}A{2},{3},0,0,1,{0},{4}",
                        cx,
                        cy - unit * height / 2,
                        unit * width / 8,
                        unit * height / 2,
                        cy + unit * height / 2
                    )).attr(attrFar);

                axisVert = paper.path(
                    format("M{0},{1}L{0},{2}",
                        cx,
                        cy - unit * height / 2,
                        cy + unit * height / 2
                    )).attr(attrAxis);

                nearHoriz = paper.path(
                    format("M{0},{1}A{2},{3},0,0,0,{4},{1}",
                        cx - unit * width / 2,
                        cy,
                        unit * width / 2,
                        unit * width / 10,
                        cx + unit * width / 2
                    )).attr(attrNear);

                farHoriz = paper.path(
                    format("M{0},{1}A{2},{3},0,0,1,{4},{1}",
                        cx - unit * width / 2,
                        cy,
                        unit * width / 2,
                        unit * width / 10,
                        cx + unit * width / 2
                    )).attr(attrFar);

                axisHoriz = paper.path(
                    format("M{0},{1}L{2},{1}",
                        cx - unit * width / 2,
                        cy,
                        cx + unit * width / 2
                    )).attr(attrAxis);


            };

            this.animateCanvas = function () {
                var rx = this.width * unit / 8;
                var s = 1;
                var t = 0;
                var ry = unit * this.height / 2;
                var maxRx = this.width * unit / 2;
                var stepS = 0.1;
                var stepT = 0.5;
                var sweep = 0;
                var top = cy - unit * this.height / 2;
                var bottom = cy + unit * this.height / 2;

                (function rotateVert() {
                    if (s > 4) {
                        stepS = -0.1;
                        stepT = -0.5;
                        nearVert.attr(attrFar);
                        farVert.attr(attrNear);

                    }
                    if (s < 0) {
                        stepS = 0.1;
                        stepT = 0.5;
                        nearVert.attr(attrNear);
                        farVert.attr(attrFar);
                    }
                    s += stepS;
                    t += stepT;

                    nearVert.animate({"transform": "s" + s + ",1," + cx + "," + cy}, 50);
                    farVert.animate({"transform": "s" + s + ",1," + cx + "," + cy}, 50, rotateVert);
//                    nearVert.animate({"path":
//                        format("M{0},{1}A{2},{3},0,0,{5},{0},{4}",
//                            cx,
//                            top,
//                            rx,
//                            ry,
//                            bottom,
//                            sweep
//                        )}, 50
//                    );
//                    farVert.animate({"path":
//                        format("M{0},{1}A{2},{3},0,0,{5},{0},{4}",
//                            cx,
//                            top,
//                            rx,
//                            ry,
//                            bottom,
//                            1 - sweep
//                        )}, 50, rotateVert
//                    );
                })();


            }
        }

    }
);
