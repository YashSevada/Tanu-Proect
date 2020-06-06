import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from 'material-ui-image'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('It is a way of software testing in which the internal structure or the program or the code is hidden and nothing is known about it', 'It is a way of testing the software in which the tester has knowledge about the internal structure r the code or the program of the software'),
  createData('It is mostly done by software testers','It is mostly done by software developers'),
  createData('It is functional test of the software','It is structural test of the software'),
  createData('It is the behavior testing of the software','It is the logic testing of the software'),
  createData('It is also called closed testing', 'It is also called as clear box testing'),
];

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="ANN Works" {...a11yProps(0)} />
          <Tab label="Existing Software Testing Techniques" {...a11yProps(1)} />
          <Tab label="Testing Approaches" {...a11yProps(2)} />
          <Tab label="Distinguish between white box and black box" {...a11yProps(3)} />
          <Tab label="Our Evaluation of Sotftware Testing Techniques using ANN" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      {/* ANN Works */}
      <TabPanel value={value} index={0}>
      <p>Firstly, it helps us understand the impact of increasing / decreasing the dataset vertically or horizontally on computational time.
Secondly, it helps us understand the situations or cases where the model fits best.</p>
<p>Thirdly, it also helps us explain why certain model works better in certain environment or situations.</p>
<img src="https://www.analyticsvidhya.com/wp-content/uploads/2014/10/flowchart-ANN.png"/>
      </TabPanel>

      {/* Existing Software Testing Techniques */}
      <TabPanel value={value} index={1}>
        <p>Software testing is a process, to evaluate the functionality of a software application with an intent to find whether the developed software met the specified requirements or not and to identify the defects to ensure that the product is defect-free in order to produce the quality product.</p> 
        <p><b>Acceptance Testing:</b> Formal testing conducted to determine whether or not a system satisfies its acceptance criteria and to enable the customer to determine whether or not to accept the system. It is usually performed by the customer. Read More on Acceptance Testing</p>

<p><b>Accessibility Testing:</b> Type of testing which determines the usability of a product to the people having disabilities (deaf, blind, mentally disabled etc). The evaluation process is conducted by persons having disabilities. Read More on Accessibility Testing</p>

<p><b>Active Testing:</b> Type of testing consisting in introducing test data and analyzing the execution results. It is usually conducted by the testing team.</p>

<p><b>Agile Testing:</b> Software testing practice that follows the principles of the agile manifesto, emphasizing testing from the perspective of customers who will utilize the system. It is usually performed by the QA teams. Read More on Agile Testing</p>

<p><b>Age Testing:</b> Type of testing which evaluates a system's ability to perform in the future. The evaluation process is conducted by testing teams.</p>

<p><b>Ad-hoc Testing:</b> Testing performed without planning and documentation - the tester tries to 'break' the system by randomly trying the system's functionality. It is performed by the testing team. Read More on Ad-hoc Testing</p>

<p><b>Alpha Testing:</b> Type of testing a software product or system conducted at the developer's site. Usually it is performed by the end users. Read More on Alpha Testing</p>

<p><b>Assertion Testing:</b> Type of testing consisting in verifying if the conditions confirm the product requirements. It is performed by the testing team.</p>

<p><b>API Testing:</b> Testing technique similar to Unit Testing in that it targets the code level. Api Testing differs from Unit Testing in that it is typically a QA task and not a developer task. Read More on API Testing</p>

<p><b>All-pairs Testing:</b> Combinatorial testing method that tests all possible discrete combinations of input parameters. It is performed by the testing teams.</p>

<p><b>Automated Testing:</b> Testing technique that uses Automation Testing tools to control the environment set-up, test execution and results reporting. It is performed by a computer and is used inside the testing teams. Read More on Automated Testing</p>
<p><b>Basis Path Testing: </b>A testing mechanism which derives a logical complexity measure of a procedural design and use this as a guide for defining a basic set of execution paths. It is used by testing teams when defining test cases. Read More on Basis Path Testing</p>

<p><b>Backward Compatibility Testing:</b> Testing method which verifies the behavior of the developed software with older versions of the test environment. It is performed by testing team.</p>

<p><b>Beta Testing: </b>Final testing before releasing application for commercial purpose. It is typically done by end-users or others.</p>

<p><b>Benchmark Testing:</b> Testing technique that uses representative sets of programs and data designed to evaluate the performance of computer hardware and software in a given configuration. It is performed by testing teams. Read More on Benchmark Testing</p>
      </TabPanel>

      {/* Teting Approaches */}
      <TabPanel value={value} index={2}>
      <h2><b>Testing Methods:</b></h2>
<p><b>1. Static Testing</b></p>
<p><b>2. Dynamic Testing</b></p>
<p><b>3. Static Testing: </b>It is also known as Verification in Software Testing. Verification is a static method of checking documents and files. Verification is the process, to ensure that whether we are building the product right i.e., to verify the requirements which we have and to verify whether we are developing the product accordingly or not.</p>
<p>
Activities involved here are Inspections, Reviews, Walkthroughs
</p>
<p><b>Dynamic Testing:</b>It is also known as Validation in Software Testing. Validation is a dynamic process of testing the real product. Validation is the process, whether we are building the right product i.e., to validate the product which we have developed is right or not.</p>

<h2><b>Testing Approaches:</b></h2>
<p>There are three types of software testing approaches.</p>
<br/>
<b>1. White Box Testing</b>
<br/>
<b>2. Black Box Testing</b>
<br/>
<b>3. Grey Box Testing</b>
<br/>
<p><b>White Box Testing:</b> It is also called as Glass Box, Clear Box, Structural Testing. White Box Testing is based on application’s internal code structure. In white-box testing, an internal perspective of the system, as well as programming skills, are used to design test cases. This testing is usually done at the unit level.</p>

<p><b>Black Box Testing:</b> It is also called as Behavioral/Specification-Based/Input-Output Testing. Black Box Testing is a software testing method in which testers evaluate the functionality of the software under test without looking at the internal code structure.</p>

<p><b>Grey Box Testing:</b> Grey box is the combination of both White Box and Black Box Testing. The tester who works on this type of testing needs to have access to design documents. This helps to create better test cases in this process.</p>
      </TabPanel>
      <TabPanel value={value} index={3}>

      <TableContainer component={Paper}>
      <Table style={{minWidth: '650'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign:'center'}}>White box </TableCell>
            <TableCell style={{textAlign:'center'}}>Black box</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{textAlign:'center'}}>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{textAlign:'center'}}>
                {row.name}
              </TableCell>
              <TableCell style={{textAlign:'center'}}>{row.calories}</TableCell>
              <TableCell style={{textAlign:'center'}}>{row.fat}</TableCell>
              <TableCell style={{textAlign:'center'}}>{row.carbs}</TableCell>
              <TableCell style={{textAlign:'center'}}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </TabPanel>
      <TabPanel value={value} index={4}>
      <b>IMPORTANT KEY BEFORE LOOKING INTO PROGRAM -></b> 
<p>COLUMN MODEL_USED IMPLIES WHICH FORM OF TESTING MODEL WAS USED BLACK BOX AND WHITE BOX</p>
<p>IN TOTAL 3 PROGRAMS HAVE BEEN DONE</p>
<p>Initially based on accuracy the deep learning model shows how we can predict the if black box testing has taken place or whitebox testing has taken place</p>
<p>Second deep learning model proves customer satisfaction as a function of all the parameters except software name and then based on that we see if blackbox testing has caused more satisfactory answers or whitebox testing</p>
<p>Third deep learning model is a direct function of whether black box software was used or whitebox software was used and its direct effect on customer satisfaction as a fundamental and only parameter so as to determine an empirical relationship between the two </p>
<p># 1)Importing the requisite libraries</p>
<p>import numpy as np</p>
<p>import matplotlib.pyplot as plt</p>
<p>import pandas as pd</p>

<p>#dataset used</p>
<p>dataset = pd.read_csv('ann.csv')</p>
 

<p>#restructuring dataset for getting randomness</p>
<p>#remember 1 in model_used for black box testing and 0 for white box testing</p>
<p>df2 = dataset.reindex(np.random.permutation(dataset.index))</p>
<p>df2.head(20)</p>

<p>‘’ </p>
<p>#taking in values for X component</p>
<p>X = df2.iloc[:, 1:8].values</p>
<p>#column values</p>
<p>y = df2.iloc[:, 1].values</p>

<p>#</p>
<p>from sklearn.model_selection import train_test_split</p>
<p>X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 0)</p>
<Image src="../dashboard/1.png"/>

      </TabPanel>
    </div>
  );
}