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
        {"input": [4, 2], "answer": [8.38, 21.48], "explanation": [8.38, 21.48]},
        {"input": [2, 2], "answer": [4.19, 12.57], "explanation": [4.19, 12.57]},
        {"input": [2, 4], "answer": [16.76, 34.69], "explanation": [16.76, 34.69]},
    ],
    "Extra": [
        {"input": [1, 3], "answer": [4.71, 17.07], "explanation": [4.71, 17.07]},
        {"input": [10, 10], "answer": [523.6, 314.16], "explanation": [523.6, 314.16]},
        {"input": [10, 1], "answer": [5.24, 24.79], "explanation": [5.24, 24.79]},
        {"input": [82, 19], "answer": [15499.57, 3930.55], "explanation": [15499.57, 3930.55]},
        {"input": [2, 3], "answer": [9.42, 22.25], "explanation": [9.42, 22.25]},
    ]
}
