
###Welcome to SAFEDRUG Info
[![Circle CI](https://circleci.com/gh/REI-Systems/tesla/tree/develop.svg?style=svg&circle-token=ca8740acccdd84614021be6f9e709c7f2bdd34aa)](https://circleci.com/gh/REI-Systems/tesla/tree/develop) [![Coverage Status](https://coveralls.io/repos/REI-Systems/tesla/badge.svg?branch=develop&t=X87JNV)](https://coveralls.io/r/REI-Systems/tesla?branch=develop)

### **SA**fe, **F**ast & **E**fficient **D**rug **R**eal-time **U**ser **G**uide Information (SAFEDRUG Info)

##### ***– A Prototype Tool Developed for GSA 18F by REI Systems, Inc. –***

**SAFEDRUG Info** provides data from [open.fda.gov](http://open.fda.gov) about the safety of alternative drugs/devices in a way that consumers and health care providers find easy to access as they choose drugs to prescribe or purchase. (It allows search based upon a health condition or symptom, indication of need, or drug name – rather than requiring that the user know the drug name.)


####**DESIGN CRITERIA:**
 1. Bob Weber was assigned and accountable to lead design and development of SAFEDRUG Info based on his extensive successful agile and engineering experience.
 2. Multidisciplinary collaborative team members include: Product Manager, Technical Architect, Content Strategist, Visual Designer, Business Analyst, Front-End Web Developer, Back-End Web Developers, DevOps Engineer, and SME (pharma).
 3. We convened a panel of six patient/consumer “users” to determine their highest priority desires for an application; to review potential models and provide design feedback; to test the prototype for usability (a subset); and to test/accept the final product.
 4. We used four “human-centered design” tools, including (1) user interviews, (2) developing personas, (3) card sorting, and (4) A/B testing.
 5. We adapted FDA’s design style guide; and used the Material Design open source library.
 6. We used six modern open source technologies, including: AngularJS (frontend), Node.js (backend), Elastic Search (search), Selenium & Chef (testing/deployment), and hapi (API).
 7. Our user panel performed a portion of usability testing, leading us to revise QQQ and RRR. Additional automated usability testing (via tool PPP) led us to revise SSS.
 8. User feedback after sprint 1 led us to make design changes including FFF and GGG. Additional interactive feedback during sprints 2 and 3 led us to change HHH and JJJ.
 9. Our SAFEDRUG Info prototype operates on PC, tablet and smartphones using responsive design with modern browsers including Safari, FireFox, Chrome, and IE9+.
 10. SAFEDRUG Info and its underlying platforms are all openly licensed and are available free of charge. SAFEDRUG Info itself is available under The MIT License.
 
####**DEVELOPMENT CRITERIA:**
 1. See Design Criteria a.
 2. Design Criteria b.
 3. Design Criteria f.
 4. We deployed SAFEDRUG Info on Amazon Web Services (AWS), at [url]. Our agile scrum board is at [url]. It shows each action during our sprints.
 5. We wrote unit tests for code using [Selenium], including [XXX test name/purpose] and [YYY], and ran them with ZZZ results.
 6. REI set up and used continuous integration, to automate tests (using Travis CI), and continuously deployed our code on AWS. As can be observed at [reference], we made more than ### deployments in the five business days leading up to the RFQ closing date.
 7. REI set up and used configuration management (evidenced by the repository visible at [url]
 8. REI set up and used continuous monitoring [using ??? tool, with what evidence?]
 9. REI deployed the SAFEDRUG Info prototype in a container, [how?]
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

##### **Frontend**
- bower install
- grunt serve

##### **Backend**
- brew install mongodb
- npm install
- Start mongodb
- Run node app.js

####  **License**
