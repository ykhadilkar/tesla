
###Welcome to VelociRx
[![Circle CI](https://circleci.com/gh/REI-Systems/tesla/tree/develop.svg?style=svg&circle-token=ca8740acccdd84614021be6f9e709c7f2bdd34aa)](https://circleci.com/gh/REI-Systems/tesla/tree/develop) [![Coverage Status](https://coveralls.io/repos/REI-Systems/tesla/badge.svg?branch=develop&t=X87JNV)](https://coveralls.io/r/REI-Systems/tesla)

### VelociRx

##### ***– A Prototype Tool Developed for GSA 18F by REI Systems, Inc. –***

**VelociRx** assists users finding the most relevant medical information from [open.fda.gov](http://open.fda.gov) regarding medications used to treat various conditions.  It provides brief analytics of side-effects associated reported adverse events with breakdowns by age and gender.  Additionally, the volume of drug recalls over time is reported, with a list of drug interactions and their respective effects.  Finally, users can drill down on individual drugs where they find a wealth of information at their fingertips.

### Design Approach

Our approach for developing a user-centric design for VelociRx focused on delivering an application with the most value for our projected users via a clean, multi-platform, intuitive interface.  We defined a target audience through defining personas of users.  We selected a representative user group composed of individuals with a diverse age, and gender background. Through videotaped interviews and survey questions, we compiled data regarding the challenges people have with finding helpful FDA medication data. Analysis of characteristics of users was conducted via a card sorting exercise to group users into persona types to better understand the target audience.

The development team then grouped application topic/focus-areas via a card sorting exercise to ensure the user interface delivered relevant information in an order that best met user and application expectations.
We then developed objectives for our application, features needed to meet those goals, and defined approaches to deliver those features.  First, hand-drawn, white-board wireframes were used to communicate and revise ideas in a rapid, iterative fashion.  Candidate feature implementations were further defined using Balsamiq for wider review.  Finally, finished mockups were developed using Adobe Photoshop to communicate a very clear common vision to the team for the look and feel of the application.

As the application was developed during sprints, 3 demonstrations were conducted with the original representative user group as well as a wider group of stakeholders. The product owner facilitated a targeted discussion to extract the most relevant feedback to drive user stories for subsequent sprints. 

### Development Approach
Our team selected and configured the required supporting infrastructure based on 18F project requirements.  This included GitHub version control, Slack team for communication, Trello for Agile planning, Docker containers, Circle CI for continuous integration, Coveralls for unit testing coverage monitoring, Tutum for automated container deployment, and AWS for hosting.  Our team selected a generic project codename of “Tesla” as a placeholder to the eventual name.

Next the team selected relevant application technologies. For the frontend, AngularJS with the Material Framework to provide a modern user experience with well-tested UI components.  Bower was selected over Yoeman for package management more flexible on implementation approach which we hoped would save time. NodeJS with the Grunt task-runner was selected as the backend application language to provide lightweight and JavaScript centric design allowing developers to easily task switch between the backend and front-end. HAPI was selected as a framework to also speed development. Using our initial analysis of the relatively unstructured data, we selected Elastic Search and MongoDB for data storage. Later we discarded MongoDB as unnecessary.

Using data from the interview process, the VelociRx product owner defined a list of feature goals. Via a planning poker card sorting exercise, the development team and the product owner prioritized features based on quantitate estimates of delivered value and implementation complexity.

Selecting relevant data sources proved to be a challenge. Instead of providing only a slick interface to the OpenFDA API, we viewed it as a requirement to mashup OpenFDA data with other data as a way of providing true value to the user
VoxHealth http://voxhealth.org/ to provide a list of synonyms for drug indicators.  We ingested this data into a locally hosted instance of Elastic Search to provide improved usability for search auto-complete functionality. [National Library of Medicine RxNorm](http://www.nlm.nih.gov/research/umls/rxnorm) for pill image and drug interactions. A wide variety of other data sources were analyzed, reviewed and even implemented before being withdrawn from the final application. The reasons for not using some of the other data sets included: incomplete data, incompatibility with existing data, or data that led users to inaccurate conclusions.  This data included sources from GoodRx and others.


####**DESIGN CRITERIA:**
 1. Bob Weber was assigned and accountable to lead design and development of VelociRx based on his extensive successful agile and engineering experience.
 2. Multidisciplinary collaborative team members include: Product Manager, Technical Architect, Content Strategist, Visual Designer, Business Analyst, Front-End Web Developer, Back-End Web Developers, DevOps Engineer, and SME (pharma).
 3. We convened a panel of six patient/consumer “users” to determine their highest priority desires for an application; to review potential models and provide design feedback; to test the prototype for usability (a subset); and to test/accept the final product.
 4. We used four “human-centered design” tools, including (1) user interviews, (2) developing personas, (3) card sorting, and (4) A/B testing.
 5. We adapted FDA’s design style guide; and used the Material Design open source library.
 6. We used six modern open source technologies, including: AngularJS (frontend), Node.js (backend), Elastic Search (search), Selenium & Chef (testing/deployment), and hapi (API).
 7. Our user panel performed a portion of usability testing, leading us to revise QQQ and RRR. Additional automated usability testing (via tool PPP) led us to revise SSS.
 8. User feedback after sprint 1 led us to make design changes including FFF and GGG. Additional interactive feedback during sprints 2 and 3 led us to change HHH and JJJ.
 9. Our VelociRx prototype operates on PC, tablet and smartphones using responsive design with modern browsers including Safari, FireFox, Chrome, and IE9+.
 10. VelociRx and its underlying platforms are all openly licensed and are available free of charge. VelociRx itself is available under The MIT License.
 
####**DEVELOPMENT CRITERIA:**
 1. See Design Criteria a.
 2. Design Criteria b.
 3. Design Criteria f.
 4. We deployed VelociRx on Amazon Web Services (AWS), at https://VelociRx.reisys.com. Our agile scrum board is at [url]. It shows each action during our sprints.
 5. We wrote unit tests for code using [Selenium], including [XXX test name/purpose] and [YYY], and ran them with ZZZ results.
 6. REI set up and used continuous integration, to automate tests (using Travis CI), and continuously deployed our code on AWS. As can be observed at [reference], we made more than ### deployments in the five business days leading up to the RFQ closing date.
 7. REI set up and used configuration management (evidenced by the repository visible at [url]
 8. REI set up and used continuous monitoring [using ??? tool, with what evidence?]
 9. REI deployed the VelociRx prototype in a container, [how?]
 10. See Design Criteria h.
 11. See Design Criteria j.
 12. See Design Criteria k.

####**REI SYSTEMS FOLLOWED THE DIGITAL SERVICES PLAYBOOK,**  *as evidenced by:*
1.	Understand what people need – see Design Criteria c.
2.	Address the whole experience – see Design Criteria c.
3.	Simple and intuitive – no training or instruction is needed.
4.	Agile. We used three agile, iterative sprints to design, develop, and refine/implement SAFEDRUG Info.
5.	Budget to support delivery – We estimated effort required, and dedicated four full-time staff and six additional part-time specialists for seven business days, plus four hours each from six user panelists. We paid $500 for Amazon Web Services hosting. 
6.	One leader.  Bob Weber is accountable as our Product Owner.
7.	Experienced team. We brought designers and developers each with over 12 years’ experience (save one), plus an SME with 25+ years pharma industry experience.
8.	Modern technology – see Design Criteria f.
9.	Flexible hosting – see Development Criteria d.
10.	Automate testing and deployment – see Development Criteria f.
11.	Manage security and privacy through reusable processes – ???
12.	Use data to drive decisions – We compared alternative technologies, and selected XXX because it provided 27% faster user response time on mobile devices.  REI made similar data-driven, user-centric decisions at several stages of the design and development effort.
13.	Default to open – see Design Criteria k.

####**Installation Instructions**

##### **Backend**
- cd application/backend
- npm install
- Start elasticsearch
- node server.js

##### **Frontend**
- cd application/frontend
- npm install
- bower install
- cd app/
- grunt serve

####  **License**
