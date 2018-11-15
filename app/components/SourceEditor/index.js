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
      {
        id: '1',
        title: 'Syslog',
        childFn: 'sysLogTab',
        formConfig: [
          {
            name: 'displayName',
            label: 'Dispaly Name',
            item: 'input',
            type: 'text'
          },
          {
            name: 'sourceHost',
            label: 'IP or HostName',
            item: 'input',
            type: 'text'
          },
          {
            name: 'logFolder',
            label: 'Log Folder',
            item: 'input',
            type: 'text'
          },
          {
            name: 'logFolder',
            label: 'Log Folder',
            item: 'input',
            type: 'text'
          }
        ]
      },
      { id: '2', title: 'Archive', childFn: 'archiveTab' },
      { id: '3', title: 'Forwarding', childFn: 'forwardingTab' }
    ],
    formData: {
      archiveEnabled: true,
      archiveFolder: '{defaultarchivepath}\\{host}',
      archivePeriod: '30',
      displayName: '',
      forwardEnabled: false,
      forwardHost: '',
      forwardPort: '514',
      forwardTransport: 'UDP',
      logFilename: '{host}-{date}.log',
      logFolder: '{defaultlogpath}\\{host}',
      port: '514',
      sourceHost: ''
    }
  };

  sysLogTab = () => (
    <Fragment>
      <FormGroup>
        <Label for="exampleEmail">Dispaly Name</Label>
        <Input
          type="text"
          name="displayName"
          value={this.state.formData.displayName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">IP or HostName</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.state.formData.sourceHost}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Log Folder</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.state.formData.logFolder}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">File Name Format</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.state.formData.logFilename}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Syslog Port</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.state.formData.port}
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
          value={this.state.formData.archiveFolder}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Archive files older than (days)</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={this.state.formData.archivePeriod}
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
          value={this.state.formData.forwardHost}
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
          value={this.state.formData.forwardPort}
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
