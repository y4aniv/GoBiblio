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

def check_data_type(data: Dict, types: Dict) -> List[str]:
    """
    Check if the data has the correct type

    Args:
        - data (Dict): The data of the request
        - types (Dict): The required types
    Returns:
        - List[str]: The wrong types
    """
    wrong_types = []
    for key, value in types.items():
        if key in data and not isinstance(data[key], value):
            wrong_types.append(key)
    return wrong_types