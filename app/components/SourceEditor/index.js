import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Row,
  Col,
  NavLink,
  NavItem,
  Button,
  Nav,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import ToggleButton from 'components/ToggleButton';
import './style.scss';

class SourceEditor extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    activeTab: '1'
  };
  render() {
    return (
      <div className="sourceEditor">
        <Nav tabs>
          <NavItem className="active">
            <NavLink
              className={this.state.activeTab === '1' ? 'active' : null}
              onClick={() => {
                this.setState({ activeTab: '1' });
              }}
            >
              Syslog
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '2' ? 'active' : null}
              onClick={() => {
                this.setState({ activeTab: '2' });
              }}
            >
              Archive
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === '3' ? 'active' : null}
              onClick={() => {
                this.setState({ activeTab: '3' });
              }}
            >
              Forwarding
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="tabContent">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Dispaly Name</Label>
                    <Input
                      type="text"
                      name="displayName"
                      value={this.props.displayName}
                    />
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
                  <FormGroup>
                    <Button className="halfButton" color="danger">
                      Cancel
                    </Button>
                    <Button
                      className="halfButton"
                      color="success"
                      type="submit"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Form>
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
                    <Label for="exampleEmail">
                      Archive files older than (days)
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      value={this.props.archivePeriod}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="halfButton" color="danger">
                      Cancel
                    </Button>
                    <Button
                      className="halfButton"
                      color="success"
                      type="submit"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Form>
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
                    <Label for="exampleEmail">Forward Port</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      value={this.props.forwardPort}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button className="halfButton" color="danger">
                      Cancel
                    </Button>
                    <Button
                      className="halfButton"
                      color="success"
                      type="submit"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

SourceEditor.propTypes = {};

export default SourceEditor;
