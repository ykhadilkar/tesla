
###Welcome to VelociRx
[![Circle CI](https://circleci.com/gh/REI-Systems/tesla/tree/develop.svg?style=svg&circle-token=ca8740acccdd84614021be6f9e709c7f2bdd34aa)](https://circleci.com/gh/REI-Systems/tesla/tree/develop) [![Coverage Status](https://coveralls.io/repos/REI-Systems/tesla/badge.svg?branch=develop&t=X87JNV)](https://coveralls.io/r/REI-Systems/tesla)

### VelociRx

##### ***– A Prototype Tool Developed for GSA 18F by REI Systems, Inc. –***

**VelociRx** assists users finding the most relevant medical information from [open.fda.gov](http://open.fda.gov) regarding medications used to treat various conditions. It provides brief analytics of side-effects associated reported adverse events, and allows breakdowns by age and gender. Additionally, the volume of drug recalls over time is reported, with a list of drug interactions and their respective effects. Finally, users can drill down on individual drugs where they find a wealth of information at their fingertips.

### Design Approach

Our approach for developing a user-centric design for VelociRx focused on delivering an application with the most value for our projected users via a clean, multi-platform, intuitive interface.  We described a target audience through defining personas of users.  We selected a representative user group composed of individuals with a diverse age, and gender background. Through videotaped interviews and survey questions, we compiled data regarding the challenges people have with finding helpful FDA medication data. Analysis of characteristics of users was conducted via a card sorting exercise to group users into persona types to better understand the target audience.

The development team then grouped application topic/focus-areas via a card sorting exercise to ensure the user interface delivered relevant information in an order that best met user and application expectations.
We then developed objectives for our application, features needed to meet those goals, and defined approaches to deliver those features.  First, hand-drawn, white-board wireframes were used to communicate and revise ideas in a rapid, iterative fashion.  Candidate feature implementations were further defined using Balsamiq for wider review.  Finally, finished mockups were developed using Adobe Photoshop to communicate a very clear common vision to the team for the look and feel of the application.

As the application was developed during sprints, three demonstrations were conducted with the original representative user group as well as a wider group of stakeholders. The product owner facilitated a targeted discussion to extract the most relevant feedback to drive user stories for subsequent sprints. 


### Development Approach
Our team selected and configured the required supporting infrastructure based on 18F project requirements.  This included GitHub version control, Slack team for communication, Trello for Agile planning, Docker containers, Circle CI for continuous integration, Coveralls for unit testing coverage monitoring, Tutum for automated container deployment, and AWS for hosting.  Our team selected a generic project codename of “Tesla” as a placeholder to the eventual name.

Next the team selected relevant application technologies. For the frontend, AngularJS with the Material Framework to provide a modern user experience with well-tested UI components.  Bower & npm were selected for package management. NodeJS with the Grunt task-runner was selected as the backend application language to provide lightweight and JavaScript centric design allowing developers to easily task switch between the backend and front-end. HAPI was selected as a framework to also speed development. Using our initial analysis of the relatively unstructured data, we selected Elastic Search and MongoDB for data storage. Later we discarded MongoDB as unnecessary.

Using data from the interview process, the VelociRx product owner defined a list of feature goals. Via a planning poker card sorting exercise, the development team and the product owner prioritized features based on quantitate estimates of delivered value and implementation complexity.

Selecting relevant data sources proved to be a challenge. Instead of providing only a slick interface to the OpenFDA API, we viewed it as a requirement to mashup OpenFDA data with other data as a way of providing true value to the user
[VoxHealth](http://voxhealth.org) to provide a list of synonyms for drug indicators.  We ingested this data into a locally hosted instance of Elastic Search to provide improved usability for search auto-complete functionality. [National Library of Medicine RxNorm](http://www.nlm.nih.gov/research/umls/rxnorm) for pill image and drug interactions. A wide variety of other data sources were analyzed, reviewed and even implemented before being withdrawn from the final application. The reasons for not using some of the other data sets included: incomplete data, incompatibility with existing data, or data that led users to inaccurate conclusions.  This data included sources from GoodRx and others.

[image](https://github.com/REI-Systems/tesla/artifacts/architecture/velocirx-ci-infrastructure.jpg)
![Continuous Integration Infrastructure & Process](https://github.com/REI-Systems/tesla/artifacts/architecture/velocirx-ci-infrastructure-icon.jpg "Continuous Integration Infrastructure & Process")


####**RFQ POOL THREE - FULL STACK CRITERIA:**
 a. Bob Weber was assigned and accountable to lead design and development of VelociRx based on his extensive successful agile and engineering experience.
 
 b. Multidisciplinary collaborative team members include: Product Manager, Technical Architect, Content Strategist, Visual Designer, Business Analyst, Front-End Web Developer, Back-End Web Developers, DevOps Engineer, and SME (pharma).
 
 c. We convened a panel of six patient/consumer “users” to determine their highest priority desires for an application; to review potential models and provide design feedback; to test the prototype for usability (a subset); and to test/accept the final product.

 d. We used four “human-centered design” tools, including (1) user interviews, (2) developing personas, (3) card sorting, and (4) iterative focus group reviews.
 
 e. We used the Material Design open source library.
 
 f. Our user panelists performed usability testing, leading us, for example, to revise font colors and to re-frame the search from seeking “the most effective drug” to “the right drug for you and your family”. Videos of the panel are visible at Artifacts/UX/FeedbackSessions folder of our GitHub repository.
 
 g. User feedback led us to make design changes including changing the name from Manna to VelociRx and structuring the search for drug name after the search for health condition/indication. Example images of iterative changes on our agile scrum board are visible in the Artifacts/Project folder of our GitHub repository.
 
 h. Our VelociRx prototype operates on PC, tablet and smartphones using responsive design with modern browsers including Safari, FireFox, Chrome, and IE9+.
 
 i. We more than nine modern open source technologies, including: AngularJS, Node.js, Bower, Grunt, ElasticSearch, Docker, Jasmine, Karma, and HAPI.
 
 j. We deployed [VelociRx](https://VelociRx.reisys.com) on Amazon Web Services (AWS). 
 
 k. We performed unit tests for code at every check-in using Jasmine and Karma. Results are visible on the main page of our GitHub repository.
 
 l. REI deployed continuous integration to automate tests (using CircleCI), and continuously deployed our code on AWS. As can be observed both GitHub and CircleCI archives, we made hundreds of deployments prior to the RFQ closing date.
 
 m. REI set up and used configuration management (evidenced by our GitHub repository).
 
 n. REI configured and used Vaddy.net for applicaiton continuous security monitoring and Nessus cronjobs for OS monitoring, within AWS.
 
 o. REI deployed the VelociRx prototype in a Docker containers using Tutum.
 
 p. Installation Instructions

Backend
- cd application/backend
- npm install
- Start elasticsearch
- node server.js
Frontend
- cd application/frontend
- npm install
- bower install
- cd app/
- grunt serve

 q. VelociRx and its underlying platforms are all openly licensed and are available free of charge. VelociRx itself is available under The MIT License.
 
####**REI SYSTEMS FOLLOWED THE DIGITAL SERVICES PLAYBOOK, as evidenced by:**
1.	Understand what people need – see criteria c above.

2.	Address the whole experience – see criteria c, d, f and g and above.

3.	Simple and intuitive – no training or instruction is needed. FAQs are available.

4.	Agile. We used three agile, iterative sprints to design, develop, and refine/implement VelociRx.

5.	Budget to support delivery – We initially estimated effort required, and dedicated four full-time staff and six additional part-time specialists for eight business days, plus four hours each from six user panelists. Upon learning of GSA’s due date extension, we elected to further enhance VelociRx, and thus added six business days of effort for our four full-time staff, plus one additional meeting for the six part-time specialists, We paid approximately $200 for Amazon Web Services hosting.

6.	One leader. Bob Weber is accountable as our Product Owner.

7.	Experienced team. We brought designers and developers each with over 12 years’ experience (save one), plus an SME with 25+ years pharma industry experience.

8.	Modern technology – see criteria i above.

9.	Flexible hosting – see criteria j and p above.

10.	Automate testing and deployment – see criteria k, l, m, n and o above.

11.	Manage security and privacy through reusable processes – Not applicable for this prototype.

12.	Use data to drive decisions – We compared alternative technologies, and discarded MongoDB because we realized that we did not need to download a National Library of Medicine “Drug Interaction” data set, but we decided that we could instead rely upon the speed of NLM’s available API – thus MongoDB’s full-fledged database was no longer needed. REI made similar data-driven, user-centric decisions at several stages of the design and development effort.

13.	Default to open – see criteria q above.

####**Installation Instructions**
•	See criteria p above.

####**License**
•	[The MIT License](http://opensource.org/licenses/MIT)
