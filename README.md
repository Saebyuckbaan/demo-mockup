#Assignment 2 Part 2: ÜBERÜNO
#App Heroku URL: http://cogs121-groupc-ass2.herokuapp.com/

##Design Principles
1. Discoverability/Signifiers
  - The map of San Diego is overlayed by light and dark colors. The darker colors represent areas that Uber/Lyft drivers would benefit from, and these colors are easier to discover given Google Map's background. For example, the least beneficial areas like "Pendleton" have an almost completely opaque color, causing the user to not notice it.
  - The user also has an overview of the data represented by a bar graph in the bottom of the page. This allows the user to discover raw data in an alternate and general form.

2. Learnability
  - The different area colors and portions in the map provided should entice the user to bring their mouse over. If this was not intuitive, an instruction to do so is provided in the same screen.
  - Because hovering over the bar graph's bars is consistent with the map's hovering feature, users should be able to learn this as easily as the map.   

3. Feedback
  - When the user hovers their mouse over one of the colored areas on the map, some data about that area is displayed. The data presented directly corresponds to the darkness of that area's region in the map, which should inform the user of its importance.
  - Overall, everything that the user can perform actions on responds with an obvious result. Feedback is always present when the user presses a button or hovers over the map/bar graph.

4. Natural Mapping/Mental Metaphors
  - The main focuses of the application are the map with a regional overlay and the corresponding data of that region. These are placed immediately after the user enters the page, causing the user to naturally be curious of the map. The data displayed actively changes within the user's peripheral vision when they go through the map so that it is easy to read and the user accomplishes the application's purpose.
  - There are hints of upper and lower portions of the webpage to bring the user to the other features of the application. Specifically, the "So where should you go?" button directs the user to the lower part of the page, while the navigation bar on the top moves the user around the page.  

5. Constraints
  - When the user enters the application, they are immediately presented by the app's main focus so they don't have to find it. They may scroll up or down for minor features, but the map and data are not hard to return to.
  - Although the app uses the Google Map API, the user is constrained to the immediate map of San Diego, instead of being allowed to wander around the map.
  - Because the application is constrained to one page, the user won't have to go far to locate what they need from the application.

6. Error Prevention/Recovery
  - The user will have minimal chances for error because their main forms of input are hovering over regions on the map and clicking items on the drop-down menu.
  - The user will easily be able to recover if they click on the wrong item in the drop-down menu by returning to it and re-selecting.
  - The drop-down menu's selected element reflects where the user hovers on the map. This prevents confusion or mistakes if the user initially selects a drop-down item and then hovers to the map.

##Distribution of Work
Davis Yi:
- Provided part 1a and 1b code in Github repository
- Map Overlay maintenance
- Implement pgSQL query on Node.js server for necessary tables
- Find GEOJson file and make them local file.
- Set up and upload to Heroku app
- Refactor server side code
- Gave responsiveness on the app
- minor bug fixed

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
