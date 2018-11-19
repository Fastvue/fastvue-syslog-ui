import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Button,
  Form,
  FormGroup
} from 'reactstrap';
import Tabs from 'components/Tabs';
import FormBuilder from 'components/FormBuilder';
import tabsConfig from './tabsConfig';
import './style.scss';

class SourceEditor extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    activeTab: '0',
    formData: this.props.formData || {
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

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.formData, this.props.id);
  };
  prepareFormBuilder = (config) => (
    <Fragment>
      {config.map((item) => (
        <FormBuilder
          key={item.name}
          {...item}
          value={this.state.formData[item.name]}
          onChange={(key, value) =>
            this.setState({
              formData: {
                ...this.state.formData,
                [key]: value
              }
            })
          }
        />
      ))}
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
      <Button
        onClick={(e) => this.onFormSubmit(e)}
        className="halfButton"
        color="success"
        type="submit"
      >
        Save
      </Button>
    </FormGroup>
  );

  render() {
    return (
      <Col className="sourceEditor">
        <Tabs
          activeTab={this.state.activeTab}
          tabs={tabsConfig}
          onActiveTabChange={(tabId) => this.setState({ activeTab: tabId })}
        />
        <TabContent activeTab={this.state.activeTab} className="tabContent">
          {tabsConfig.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              <Form>{this.prepareFormBuilder(tab.formConfig)}</Form>
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
  onFormSubmit: PropTypes.func,
  id: PropTypes.string,
  formData: PropTypes.any
};

export default SourceEditor;
