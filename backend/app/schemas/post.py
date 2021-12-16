# Our path parameter endpoint / recipe/{recipe_id}, which we introduced in part 2 has been updated to include a response_model field. Here we define the structure of the JSON response, and we do this via Pydantic.
# The new Recipe class inherits from the pydantic BaseModel, and each field is defined with standard type hints…
# …except the url field, which uses the Pydantic HttpUrl helper. This will enforce expected URL components, such as the presence of a scheme(http or https).
# Next
