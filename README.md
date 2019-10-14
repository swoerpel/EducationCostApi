# EducationCostApi
API for calculating cost of going to different colleges optionally including room and board. Provides in-state, out-of-state, or both if information is available for both.

## Get Tuition Cost

* **URL** 

  /tuition_cost

* **Method** 

  ```GET```

* **URL Params** 

  None

* **Data Params** 
  ###### Required
  college_name : [string]

  ###### Optional
  include_room_and_board : [boolean]
  default=true

* **Success Response**
  - **Code**: 200
  - **Content**: 
  ```
  {
    "college_name": "University of Wisconsin, Madison",
    "in_state": 22231,
    "out_of_state": 47450
  }
  

* **Error Responses**
  - **Code**: 400
  - **Content**: 
  ```
  {
      "message": "Error: College name is required"
  }
  ```
  
  - **Code**: 401
  - **Content**:
  ```
  {
      "message": "Error: College not found"
  }
  ```
  
* **Sample Calls**
  - Body 1
  ```{
    "college_name": "Universty of Wisconsin, Madison",
    "include_room_and_board" : false
  }
  ```
  - Response 1 - information for both in and out of state exists
  ```{
    "college_name": "University of Wisconsin, Madison",
    "in_state": 10955,
    "out_of_state": 36174
  }
  ```
  
  - Body 2 - "include_room_and_board" is optional true
  ```{
    "college_name": "Liberty University",
  }
  ```
  - Response 2 - information for only in state exists
  ```{
    "college_name": "Liberty University",
    "in_state": 24910
  }
  ```
      
      
      
      
      
      
