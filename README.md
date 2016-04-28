#Assignment 2 Part 2:
#App Heroku URL: http://cogs121-groupc-ass2.herokuapp.com/

##Design Principles
1. Discoverability/Signifiers
  - The map of San Diego is overlayed by light and dark colors. The darker colors represent areas that Uber/Lyft drivers would be needed more and these colors are easier to discover given Google Map's background.

2. Learnability
  - TBA

3. Feedback
  - When the user hovers their mouse over one of the colored areas on the map, some data about that area is displayed.

4. Natural Mapping/Mental Metaphors
  - The main focus of the application-the overlayed map and corresponding data-is placed in a way that is easy for the user. The data displayed actively changes within the user's peripheral vision when they go through the map so that it is easy to read.

5. Constraints
  - When the user enters the application, they are immediately presented by the app's main focus so they don't have to find it. They may scroll up or down for minor features, but the map and data are not hard to return to.
  - Although the app uses the Google Map API, the user is constrained to the immediate map of San Diego, instead of being allowed to wander around the map.

6. Error Prevention/Recovery
  - The user will have minimal chances for error because their main forms of input are hovering over regions on the map and clicking items on the drop-down menu.
  - The user will easily be able to recover if they click on the wrong item in the drop-down menu by returning to it and re-selecting. 

##Distribution of Work
Davis Yi:
- Provided part 1a and 1b code in Github repository
- Map Overlay maintenance
- Implement pgSQL query on Node.js server for necessary tables
- Find GEOJson file and make them local file.
- Set up and upload to Heroku app
- Refactor server side code

Elaine Hu:
- Found and connected GeoJSON file of SD county to D3
- Added Google Map overlay
- Front-end design using bootstrap


Jose Paulo Gonzales:
- Wrote README
- Map overlay color and its legends implementation
- Google Maps restrictions


Yue Eunice Wong:
- Got queries and data from DELPHI for part 2
- Added UI and styling
- Added DELPHI and PostGreSQL connections
- Mining database to find suitable data tables to help for Uber/Lyft driver
- General D3 Implementation

Mustafa Khan:
- Connected GeoJSON file of SD county to D3
- General D3 Implementation
