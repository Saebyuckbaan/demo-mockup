# COGS 121 - Assignment 2
*Due: Thursday 4/28, 12:00pm* 

The purpose of this assignment is to build off of previous assignments to tackle a particular problem space and devise a solution using the design principles that you have already learned. The main goals of this assignment are to learn the basics of SQL and integrate that data into a information visualization. Furthermore, the tools you’ll be required to use is data from the DELPHI database and finding a way to intuitively convey that data using D3.

## Notes
* This assignment is intended to be done in your assigned COGS 121 team.
* The assignment may feel overwhelming, so **please start early** and collaborate with your team!
* Only Part 2 will be graded. However, since Part 1 provides guidances to Part 2, it is important that you complete Part 1 as well.
* DO NOT PUSH OR SEND PULL REQUEST TO BOILERPLATE REPOSITORY

## Goals:
* Utilize SQL to extract data from a database
* Integrate data from a database into D3
* Create data visualizations that are meaningful

## Before Starting
To help get started we have provided some resources to help you brush up on the technologies we will be using in this assignment.

* Tutorial videos for SQL
	* <a href="http://www.w3schools.com/sql/" target="_blank" class="_">Text Learners</a>
	* <a href="https://www.youtube.com/watch?v=7Vtl2WggqOg" target="_blank" class="_">Video Learners</a>
	* <a href="http://sqlzoo.net/" target="_blank" class="_">(Lab) Hands-on Learners</a>
* D3 Tutorial videos
      * <a href="https://square.github.io/intro-to-d3/" target="_blank" class="_">Text Learners</a>
      * <a href="https://www.youtube.com/watch?v=8jvoTV54nXw" target="_blank" class="_">Video Learners</a>


## The Assignment (Part 1) - Getting Started

This assignment contains an overview of several technologies that you can use in conjunction with D3 such as AJAX, HTML5, and NodeJS. The first part of the assignment shows you how to create webpages with D3 and AJAX and how to get dynamically generated data from a Postgres database. 

Many toolkits are available to provide AJAX support and if you need this functionality in D3 there are some built-in functions that can be used to retrieve data from a URL. One method provides generic AJAX support and the second provides support for JSON data.

``d3.xhr(requestURL, callback)``

``d3.json(requestURL, callback)``


The DELPHI (Data e-Platform to Leverage Multilevel Personal Health Information) database the PostgreSQL database you'll be using for Part 1 and Part 2 in this assignment.

##Part 1A: 
###D3 and AJAX requests
This simple exercise will illustrate how to use `d3.xhr ()`  to retrieve a dataset for populating a bar chart. 

1.	Clone [World Happiness Report 2016](https://github.com/WeibelLab-Teaching/cogs121-sp16-ass2/tree/master/World-Happiness-Report-2016). The data values are just a set of random numbers but let’s make the assumption that the data represents a measure of ‘happiness’ (range 0-10) for 20 unspecified countries.
2.	For the first part of the assignment, we want to visualize the actual ‘happiness’ data. (Yes, that exists.) You can obtain this data from the [World Happiness Data Report](http://worldhappiness.report/wp-content/uploads/sites/2/2016/03/HR-V1Ch2_web.pdf) (Pages 13-15 in PDF). The World Happiness Report is a measure of happiness published by the United Nations Sustainable Development Solutions Network. _Notice the document is a PDF._ You will have to get creative with data extraction. Although Wikipedia has this data as well, the point of this exercise is to appreciate how physical data is transcribed, processed and exchanged digitally.
3.	Make a bar chart with all 157 countries  listed in the report. Please put the country on the x-axis and the Happiness value (1-10) on y-axis. **Take a screenshot of your result.** For a bonus exercise find the average happiness index of each of the 6 continents—excluding Antarctica and indicate it on the chart. Not too bad right? Now you know how to pass any data to d3!!!

### Connecting to DELPHI database Using pgAdmin

To install pgadmin:

<a href="http://macappstore.org/pgadmin3/" target="_blank" class="_">MacOSX</a>

Linux:
sudo apt-get install postgresql pgadmin3

Launch ‘pgAdmin’ by typing `pgadmin3` in terminal
Then you should connect to remote server using connect button. You will see the window.

>name: DELPHI database 

>host: delphidata.ucsd.edu

>port: 5432

>username: cogs121_16_user

>password:  mcH8Yjs_n#2(xp

>Maintenance db: delphibetadb

and then press OK. 
It may show a warning. Simply press OK.

Then in object browser in main window double-click "Server groups". It will expand to "servers". Then double-click "Servers". It will expand to DELPHI database. Expand the DELPHI database.

You will see 
* databases
* tablespaces
* group rules
* login roles

From databases navigate to delpgibetadb. Please note that you should use (and only have access to) the tables found in 'cogs121_16_raw' and 'cogs121_16_integrated' schema.

### Diving into D3

For this section of the assignment you will be creating a basic bar chart from scratch. The only file you will need to modify is ``index.js``. When you load the application for the first-time there is already an example of a bar chart created using D3. However, there are somethings that are wrong with it -- the chart is upside down, the x and y axis are nonexistent, etc. Your job will be to implement the **TODO** sections of code, fix any errors, and incorporate the given taco data.

1. **Margin Conventions**
	*  You won't need to do any coding for this step, we just want to introduce you to how the D3 layout is set up. The first thing you'll notice at the top of the file are these abitrary values for margins are sizing. Take a look at [D3 margin conventions](http://bl.ocks.org/mbostock/3019563) for more information on how the canvas is structured with D3. The key thing to note is that your starting point for drawing SVGs is at (0,0) -- the top-left corner of the application with X growing towards the right, and Y growing downwards.

    ```
      var margin = {top: 20, right: 10, bottom: 100, left: 40},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;
    ```

2. **Defining the Chart**
	* Likewise you won't need to do any coding. In this step we are defining an SVG element which will be the canvas for the bar chart. The width and height attributes determine how large the SVG element will be on the screen. To avoid having the canvas crammed in the corner of the screen we move the canvas by translating it according to the defined margins.
	
    ```
     var chart = d3
              .select(".chart")
              .append("svg")
              .attr("width", width + margin.right + margin.left)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");
    ```
         
3. **Drawing the Chart** 
	*  In this step you will be consuming data and properly rendering it to the chart. 
	
    ```
    chart
	    .selectAll(".bar")
	    .data([10, 20, 30, 40])
	    .enter().append("rect")
	    .attr("class", "bar")
	    .attr("x", function(d, i) { return i*100; })
	    .attr("width", 100)
	    .attr("y", function(d) { return 0; })
	    .attr("height", function(d) { return d*10; });
    });
    ```
  1. Notice that the chart doesn't actually use the taco dataset given. Replace the ``[10, 20, 30, 40]`` array with the taco dataset. 
  2. Define the width and height attributes to actually use the values from the dataset. To accomplish this, you must first fix the ``xScale`` and ``yScale`` functions. If you're unfamiliar the D3 scales please read more about it [here](https://github.com/mbostock/d3/wiki/Scales).
  3. After fixing the scales, update x and y position attributes in a similar fashion so that the graph is no longer upside-down.
  4. Add spacing between the bars on your chart If they aren't present. You may want to revisit the ``xScale`` function.

4. **Labeling the X and Y Axis** 
  1. For the last step you are required to draw and x and y axis to hold the bar charts.
  2. If your names on the x-axis are being overlapped, rotate the text so that it no longer touches the other labels.

5. **End Result**
	* Your end result should look similar to this:

![End Result](https://cloud.githubusercontent.com/assets/5565596/14638829/2923003c-05ee-11e6-8d05-4894391b988f.png)

### Diving into SQL
Now that you're familiar with creating basic D3 visualizations, it's time to incorporate data from a SQL database.

1.    Create a .env file to properly connect to the DELPHI database database. After doing this step, you should no longer receiver see ``Error: ENOENT...`` in your Node console. 
2. On the side, connect to the DELPHI database using PGAdmin (or any instance of a Postgres driver) and find the 'Smoking Prevalence in Adults' and familiarize yourself with the table schema.
3. . In ``server.js``  take a look at ``app.get('/delphidata')``. This is where you want to connect to the DELPHI database using [node-postgres](https://github.com/brianc/node-postgres). Now using ``node-postgres``, create a SQL query to get the results of this query:
```
In the year 2003,  retrieve the total number of respondents for each gender from the Smoking Prevalence in Adults table from 1984-2013.
```
5. **Visualize that data using D3** 
	* Now that you have retrieved the data from the DELPHI database. In your ``index.js``, locate the AJAX call ``$.get( "/delphidata")``. Your task is to fill this method in and create a basic bar chart with **Gender** on the X-axis and **Total Respondents** on the Y-axis.
6. **End Result**
	* Your end result should look similar to this:

![End Result](https://cloud.githubusercontent.com/assets/5565596/14653067/1cdf2a06-062c-11e6-9d47-f65e9163ff95.png)

## The Assignment (Part 2) - Putting Everything Together
Now that you have learned to retrieve data using SQL and know how to make basic visualizations using D3, it’s time to tie these tools into your design. The main goal of this part of the assignment is to apply design-oriented strategy to tackle real problems with a data-driven approach. Unlike the previous assignment where your team chose a theme for your application, we are providing scenarios that you will choose from. That scenario will be the focus of your application. Keep in mind, these scenarios will be fairly broad, but your job is to choose **one specific aspect** of the problem and address that using the tools that you have learned throughout the course.

## Required technologies
    1. Postgres and extracting data from DELPHI
    2. D3 for data visualizations

## The Assignment
1. Choose one scenario for your application
    1. **Uber/Lyft Drivers** Help Uber/Lyft drivers around San Diego get the most profit by helping them position themselves closer to high demand areas. Alternatively, help Uber/Lyft drivers be better able to people that are under the influence get home safely.
    2. **Patrolling San Diego** Design a tool to help law enforcement officers efficiently patrol areas that have high crime rates, or are not safe.
    3. **AirBnB Rentals** Design a tool to help AirBnB customers find the best renting deals in San Diego.
    4. **Housing Deals** Help real estate agents analyze housing rates and get the most profit through selling housing property around San Diego.

2. Choose one aspect of the problem that you could address in an intuitive way using data visualization. You shouldn’t try to address the whole scenario, rather your goal is to make that specific aspect as well-refined as possible. Think about the problem and brainstorm what visualization would be most applicable to remedy the issue. Your visualizations should not be overly complex, it should a clear focus that users could easily pick up.

3. (Optional/Extra Credit) Incorporate one more dataset into your application that is NOT found in the DELPHI database. You can incorporate this dataset by either integrating it into your current visualization, or creating a new visualization that is intuitive. Which ever you choose, you must use it in a meaningful way to receive credit.

4. Apply each of the six design principles listed below in your application and document this in your README. Justify your decisions and show strong signifiers that the principles you mentioned in your README are indeed present.
    1. Discoverability/Signifiers - Are users able to easily find the points of the application that they are interested in?
    2. Learnability - Are users able to easily learn and remember how to interact with your application? 
    3. Feedback - Is there strong evidence of user feedback for actionable items?
    4. Natural Mapping/Mental Metaphors - Is there strong evidence of providing natural mappings or relatable metaphors that help the user navigate the application?
    5. Constraints - Does the application have deliberate constraints to guide the flow of user interaction?
    6. Error Prevention/Recovery - Is there strong evidence of error prevention and error recovery so that the user won’t be left confused when something unexpected happens?

5. Justify your design decisions. Decisions you make as a designer should have a purpose. If you used any external CSS/JS libraries (ie. Boostrap, Materialize) analyze what motivated your team to do so and describe how it fits into your design goals. If you implemented any custom CSS/JS components explain why decision was appropriate and how did decision fit into your design. Document all of this in your README. If your team has justified all the tech choices then you'll receive 1 point for completion. If not, or if your justification is not thoroughly thought out, then your team will receive no points for this section.

6. Document the contribution of each group member
    1. On your README, provide a brief documentation to show that each group member has contributed fair share of work for the assignment.

7. Push to your code to GitHub and deploy it to Heroku.


## Rubric
This assignment is **out of 21 points**. It will be graded heavily on how well you applied and executed the design skills you have been taught. 

Part 1 is focused on getting you familiar with new concepts and utilizing new tools, so it is not graded and does not need to be submitted. However, you will need to understand Part 1 to complete Part 2, so it is highly recommended that you complete Part 1 before starting on Part 2.

Part 2 will first be graded to check if your team's utilization of Postgres and D3 is fully functional in your application. This will be graded on a binary scale — you receive points upon completion if working without errors. The majority of Part 2 will be graded on application and execution of the design principles mentioned. You can receive a maximum of 2 points for each criteria, which totals up to a maximum of 12 points cumulative for the this section. If your application shows no evidence or mis-use of a principle, then you will receive 0 points for that criteria. Likewise, if there is some evidence that your team as attempted to address a criteria, then you will receive 1 point.

Extra Credit: If your team incorporates another data set outside from the DELPHI database, and utilizes it in a meaningful way in your application, then you will receive a maximum of 2 additional points. If time permits, it’s **highly** recommended that you attempt to this portion of the assignment as well.

* NOTE: This is not required. If your team having trouble finding another dataset to incorporate we have provided one below. The UN's numerous databases, tables and glossaries containing over 60 million data points cover a wide range of themes including Agriculture, Crime, Education, Employment, Energy, Environment, Health, HIV/AIDS, Human Development, Industry, Information and Communication Technology, National Accounts, Population, Refugees, Tourism, Trade, as well as the Millennium Development Goals indicators.

* You can login to the <a href="https://www.undata-api.org/" target="_blank">UN Data API<a/>


> Username: COGS121

> Password: 121cogs

> Application ID: 748700a6

> Application Keys: da089213c5409863a37878ee4adfee


It is expected that each group member equally contributes to the assignment. The distribution of work should determined by group consensus and responsibility should be given that member's expertise (either technical or design). **Document the distribution of work in the README file.**


| Criteria                                                                                       | Points |
|------------------------------------------------------------------------------------------------|--------|
| The application uses Postgres to extract data from the DELPHI database                         | 1      |
| The application utilizes D3 to visualize data from the dataset                                 | 1      |     
| The application successfully addresses a specific problem in the scenario                      | 1      |
| The application properly incorporates all the design principles mentioned                      | 12     |
| Design decisions are properly justified                                                        | 1     |
| The application is creative/intuitive                                                          | 2      |
| All group members contributed fairly to this project (README)                                  | 1      |
| **INDIVIDUAL**: Peer review completed (CATME)                                                  | 2      |
| The application incorporates an outside dataset in a meaningful way                            | 2 (bonus) |


## Submission Guidelines:
The code/application that you are submitting is what you create in part 2 only, as that is the only portion that will be graded. You will need to understand part 1 to be able to complete part 2, but you do not need to submit part 1. Your team will also need to complete peer evaluation to complete the assignment. 

Please submit your assignment via this <a href="http://goo.gl/forms/AjrkWCFuzS" target="_blank">Google Form<a/>