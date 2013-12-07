"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {"input": [4, 2], "answer": [8.378, 20.493], "explanation": [8.38, 20.49]},
        {"input": [2, 2], "answer": [4.189, 12.566], "explanation": [4.19, 12.57]},
        {"input": [2, 4], "answer": [16.755, 34.567], "explanation": [16.75, 34.57]},
    ],
    "Extra": [
        {"input": [1, 3], "answer": [4.712, 16.563], "explanation": [4.71, 16.56]},
        {"input": [10, 10], "answer": [523.599, 314.159], "explanation": [523.6, 314.16]},
        {"input": [10, 1], "answer": [5.236, 24.248], "explanation": [5.24, 24.25]},
        {"input": [82, 19], "answer": [15499.571, 3778.091], "explanation": [15499.57, 3778.09]},
        {"input": [2, 3], "answer": [9.425, 23.059], "explanation": [9.43, 23.06]},
        #{"input": [1, 10], "answer": [52.36, 159.544], "explanation": [52.36, 159.54]},
    ]
}
