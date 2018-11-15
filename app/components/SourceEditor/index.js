import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import ToggleButton from 'components/ToggleButton';
import Tabs from 'components/Tabs';
import './style.scss';

class SourceEditor extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    activeTab: '1',
    tabs: [
      { id: '1', title: 'Syslog', childFn: 'sysLogTab' },
      { id: '2', title: 'Archive', childFn: 'archiveTab' },
      { id: '3', title: 'Forwarding', childFn: 'forwardingTab' }
    ]
  };

  sysLogTab = () => (
    <Fragment>
      <FormGroup>
        <Label for="exampleEmail">Dispaly Name</Label>
        <Input type="text" name="displayName" value={this.props.displayName} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">IP or HostName</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.sourceHost}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Log Folder</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.logFolder}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">File Name Format</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.logFilename}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Syslog Port</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.port}
        />
      </FormGroup>
    </Fragment>
  );

  archiveTab = () => (
    <Fragment>
      <FormGroup>
        <Label for="exampleEmail">Archive Logs</Label>
        <ToggleButton isButtonOn={this.props.archiveEnabled} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Archive Folder</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.archiveFolder}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Archive files older than (days)</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.archivePeriod}
        />
      </FormGroup>
    </Fragment>
  );

  formActions = () => (
    <FormGroup>
      <Button
        className="halfButton"
        color="danger"
        onClick={() => this.props.onFormCancel()}
      >
        Cancel
      </Button>{' '}
      <Button className="halfButton" color="success" type="submit">
        Save
      </Button>
    </FormGroup>
  );

  forwardingTab = () => (
    <Fragment>
      <FormGroup>
        <Label for="exampleEmail">Forward Logs</Label>
        <ToggleButton isButtonOn={this.props.forwardEnabled} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Forward to Host</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.forwardHost}
        />
      </FormGroup>
      <FormGroup>
        <Input type="radio" name="portType" id="UDP" />
        <label htmlFor="UDP">UDP</label>
        <Input type="radio" name="portType" id="TCP" />
        <label htmlFor="TCP">TCP</label>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Forward Port</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.props.forwardPort}
        />
      </FormGroup>
    </Fragment>
  );
  render() {
    return (
      <Col className="sourceEditor">
        <Tabs
          activeTab={this.state.activeTab}
          tabs={this.state.tabs}
          onActiveTabChange={(tabId) => this.setState({ activeTab: tabId })}
        />
        <TabContent activeTab={this.state.activeTab} className="tabContent">
          {this.state.tabs.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              <Row>
                <Form>
                  <Col sm="12">{this[tab.childFn]()}</Col>
                </Form>
              </Row>
            </TabPane>
          ))}

          {this.formActions()}
        </TabContent>
      </Col>
    );
  }
}

SourceEditor.propTypes = {
  onFormCancel: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default SourceEditor;
