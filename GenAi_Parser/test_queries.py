from query_parser import extract_visa_info

query = "Going to France in July for tourism on an Indian passport."
print("Query:", query)
print("Parsed JSON:")
print(extract_visa_info(query))
