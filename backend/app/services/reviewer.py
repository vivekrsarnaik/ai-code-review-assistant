def analyze_code(language: str, code: str):

    suggestions = []

    if len(code) < 20:
        suggestions.append(
            "Code snippet is too small for detailed review."
        )

    if "print(" in code:
        suggestions.append(
            "Consider using logging instead of print statements."
        )

    if language.lower() == "python" and "def " in code:
        suggestions.append(
            "Consider adding type hints and docstrings."
        )

    return suggestions