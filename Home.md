# COGS 121 - Assignment 2
*Due: Thursday 4/28, 12:00pm* 

The purpose of this assignment is to build off of previous assignments to tackle a particular problem space and devise a solution using the design principles that you have already learned. The main goals of this assignment are to learn the basics of SQL and integrate that data into a information visualization. Furthermore, the tools you’ll be required to use is data from the DELPHI database and finding a way to intuitively convey that data using D3.

## Notes
* This assignment is intended to be done in a group.
* The assignment may feel overwhelming, so **please start early** and collaborate with your group!
* Only Part 2 will be graded. However, since Part 1 provides guidances to Part 2, it is important that you complete Part 1 as well.
* DO NOT PUSH OR SEND PULL REQUEST TO BOILERPLATE REPOSITORY

## Goals:
* Utilize SQL to extract data from a database
* Integrate data from a database into D3
* Create data visualizations that are meaningful

## Before Starting
To help get started we have provided some resources to help you brush up on the technologies we will be using in this assignment.

* Tutorial videos for SQL
	* Text Learners: http://www.w3schools.com/sql/
	* Video Learners: https://www.youtube.com/watch?v=7Vtl2WggqOg
	* (Lab) Hands-on Learners: http://sqlzoo.net/

* D3 Tutorial videos
	* Text Learners: https://square.github.io/intro-to-d3/
	* Video Learners: https://www.youtube.com/watch?v=8jvoTV54nXw

## The Assignment (Part 2) - Getting Started

This assignment contains an overview of several technologies that you can use in conjunction with D3 such as AJAX, HTML5, and NodeJS. The first part of the assignment shows you how to create webpages with D3 and AJAX and how to get dynamically generated data from a MySQL database. 

Many toolkits are available that provide AJAX support and if you need this functionality in D3 there are at least two methods of making AJAX based requests. One method provides generic AJAX support and the second provides support for JSON data.

``D3.xhr(requestURl,callback);``

``D3.json(requestURL,callback);``

`d3.tsv()` does not return anything, it is an asynchronous call (like when you make AJAX requests whith jQuery). So everything takes place in its callback.

The DELPHI (Data e-Platform to Leverage Multilevel Personal Health Information) database is a PostgreSQL database. 
There are hundreds of tables. Find and note table of interest using both pgAdmin and the Boilerplate

### Connecting to DELPHI database Using pgAdmin

To install pgadmin:

[MacOSX](http://macappstore.org/pgadmin3/)

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

Each schema contains tables which can be used when creating queries. Also it contains such important information as type information of table's columns.

### Connecting to DELPHI database using the Boilerplate

1.	Now access the DELPHI database using the [boilerplate]() provided. Since you just went over AJAX requests, this is a logical next step.
2.	In the boilerplate package, there are some parts that are unimplemented (refer to code in boilerplate). You will need to make those parts functional and you will ALSO need to create an .env file that has the authentication information for the DELPHI database
3.	Direct yourself to the ‘Smoking Prevalence in Adults.’  You will need to obtain the year, gender, number of respondents, and percentage of current smokers

## The Assignment (Part 2) - Putting Everything Together
Now that you have learned to retrieve data using SQL and know how to make basic visualizations using D3, it’s time to tie these tools into your design. The main goal of this part of the assignment is to apply design-thinking into new tools to tackle problems with a data-driven approach. Unlike the previous assignment where your team chose a theme for your application, we are providing scenarios that you will choose from and that scenario will be the focus of your application. Keep in mind, these scenarios will be fairly broad, but your job is to choose a specific aspect of the problem and address that using the tools that you have learned throughout the course.

1. Choose one scenario for your application
    1. Help Uber/Lyft drivers around San Diego get the most profit by helping them position themselves closer to high demand areas. Alternatively, help Uber/Lyft drivers be better able to people that are under the influence get home safely.
    2. Design a tool to help law enforcement officers efficiently patrol areas that have high crime rates, or are not safe.
    3. Design a tool to help AirBnB customers find the best renting deals in San Diego.
    4. Help real estate agents analyze housing rates and get the most profit through selling housing property around San Diego.

2. Choose one aspect of the problem that you could address in an intuitive way using data visualization. You shouldn’t try to address the whole scenario, rather your goal is to make that specific aspect as well-refined as possible.

3. (Optional/Extra Credit) Incorporate one more dataset into your application that is NOT found in the DELPHI database. You can incorporate this dataset by either integrating it into your current visualization, or creating a new visualization that is intuitive. Which ever you choose, you must use it in a meaningful way to receive credit.

4. Required technologies
    1. Postgres and extracting data from DELPHI
    2. D3 for data visualizations

5. Apply each of the six design principles listed below in your application and document this in your README. Justify your decisions and show strong signifiers that the principles you mentioned in your README are indeed present.
    1. Discoverability/Signifiers - Are users able to easily find the points of the application that they are interested in?
    2. Learnability - Are users able to easily learn and remember how to interact with your application? 
    3. Feedback - Is there strong evidence of user feedback for actionable items?
    4. Natural Mapping/Mental Metaphors - Is there strong evidence of providing natural mappings or relatable metaphors that help the user navigate the application?
    5. Constraints - Does the application have deliberate constraints to guide the flow of user interaction?
    6. Error Prevention/Recovery - Is there strong evidence of error prevention and error recovery so that the user won’t be left confused when something unexpected happens?

6. Justify your design decisions. Decisions you make as a designer should have a purpose. If you used any external CSS/JS libraries (ie. Boostrap, Materialize) analyze what motivated your team to do so and describe how it fits into your design goals. If you implemented any custom CSS/JS components explain why decision was appropriate and how did decision fit into your design. Document all of this in your README. If your team has justified all the tech choices then you'll receive 1 point for completion. If not, or if your justification is not thoroughly thought out, then your team will receive no points for this section.

7. Document the contribution of each group member
    1. On your README, provide a brief documentation to show that each group member has contributed fair share of work for the assignment.

8. Push to your code to GitHub and deploy it to Heroku.


## Rubric
This assignment is **out of 21 points**. It will be graded heavily on how well you applied and executed the design skills you have been taught. 

Part 1 is focused on getting you familiar with new concepts and utilizing new tools, so it is not graded and does not need to be submitted. However, you will need to understand Part 1 to complete Part 2, so it is highly recommended that you complete Part 1 before starting on Part 2.

Part 2 will first be graded on if Postgres and D3 is functional in your application. This will be graded on a binary scale — you receive points upon completion if working without errors. The majority of Part 2 will be graded on application and execution of the design principles mentioned. You can receive a maximum of 2 points for each criteria, which totals up to a maximum of 12 points cumulative for the this section. If your application shows no evidence or mis-use of a principle, then you will receive 0 points for that criteria. Likewise, if there is some evidence that your team as attempted to address a criteria, then you will receive 1 point.

Extra Credit: If your team incorporates another data set outside from the DELPHI database, and utilizes it in a meaningful way in your application, then you will receive a maximum of 2 additional points. If time permits, it’s **highly** recommended that you attempt to this portion of the assignment as well.

* NOTE: For the optional assignment if you would like to use data at a global scale:
You can use the UN's numerous databases, tables and glossaries containing over 60 million data points cover a wide range of themes including Agriculture, Crime, Education, Employment, Energy, Environment, Health, HIV/AIDS, Human Development, Industry, Information and Communication Technology, National Accounts, Population, Refugees, Tourism, Trade, as well as the Millennium Development Goals indicators.

* You can login to the [UN Data API](https://www.undata-api.org/)

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
The code/application that you are submitting is what you create in part 2 only, as that is the only portion that is graded. You will need to understand part 1 to be able to complete part 2, but you do not need to submit part 1. Your team will also need to complete peer evaluation to complete the assignment. 

Please submit your assignment via this <a href="http://goo.gl/forms/AjrkWCFuzS" target="_blank">Google Form<a/>