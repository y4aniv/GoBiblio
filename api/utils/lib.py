from typing import List, Dict

def find_missing_keys(data: Dict, required_keys: List[str]) -> List[str]:
    """
    Check if the required keys are in the data

    Args:
        - data (Dict): The data of the request
        - required_keys (List[str]): The required keys
    Returns:
        - List[str]: The missing keys
    """
    missing_keys = []
    for key in required_keys:
        if key not in data:
            missing_keys.append(key)
    return missing_keys