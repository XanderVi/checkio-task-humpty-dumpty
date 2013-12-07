from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from checkio.referees import checkers

from tests import TESTS


def checker(right_answer, user_answer):
    if not isinstance(user_answer, list) or len(user_answer) != 2:
        return False, "It's not a list"
    if any([not isinstance(x, (float, int)) for x in user_answer]):
        return False, "It's not numbers"
    precision = 0.1 ** 2
    return (right_answer[0] - precision <= user_answer[0] <= right_answer[0] + precision and
            right_answer[1] - precision <= user_answer[1] <= right_answer[1] + precision), None


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        cover_code={
            'python-27': cover_codes.unwrap_args,
            'python-3': cover_codes.unwrap_args
        },
        checker=checker).on_ready)
