import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TabPane, Form, FormGroup } from 'reactstrap';
import Tabs from 'components/Tabs';
import FormBuilder from 'components/FormBuilder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tabsConfig from './tabsConfig';

import StyledSourceEditor, {
  StyledTabContent,
  StyledHalfButton
} from './style';

class SourceEditor extends Component {
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
      <StyledHalfButton
        color="danger"
        onClick={() => this.props.onFormCancel()}
      >
        Cancel
      </StyledHalfButton>{' '}
      <StyledHalfButton
        onClick={(e) => this.onFormSubmit(e)}
        color="success"
        type="submit"
      >
        {this.props.loading ? (
          <Fragment>
            <FontAwesomeIcon spin icon="circle-notch" /> Saving
          </Fragment>
        ) : (
          'Save'
        )}
      </StyledHalfButton>
    </FormGroup>
  );

  render() {
    return (
      <StyledSourceEditor>
        <Tabs
          activeTab={this.state.activeTab}
          tabs={tabsConfig}
          onActiveTabChange={(tabId) => this.setState({ activeTab: tabId })}
        />
        <StyledTabContent activeTab={this.state.activeTab}>
          {tabsConfig.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              <Form>{this.prepareFormBuilder(tab.formConfig)}</Form>
            </TabPane>
          ))}

          {this.formActions()}
        </StyledTabContent>
      </StyledSourceEditor>
    );
  }
}

SourceEditor.propTypes = {
  id: PropTypes.string,
  formData: PropTypes.any,
  loading: PropTypes.any,
  onFormCancel: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default SourceEditor;
