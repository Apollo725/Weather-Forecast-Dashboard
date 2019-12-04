import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactHTMLParser from 'react-html-parser';
import Card from '../../../components/Card/Card';
import { getContent } from '../../../actions/dashboardAction';

class JsonDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: true,
    };
    this.viewClick = this.viewClick.bind(this);
  }

  componentDidMount() {
    const { state } = this.props.location;
    const { cycleId, jobGroupId, jobId, taskId, level, step, set } = state;
    console.log(
      '------JsonDataView component did mount',
      cycleId,
      jobGroupId,
      jobId,
      taskId,
      level,
      step,
      set,
    );
    const params = state;
    this.props.getContent(params);
  }

  viewClick() {
    this.setState({ rendered: !this.state.rendered });
  }

  render() {
    const { isFetching, content } = this.props;
    const { rendered } = this.state;
    console.log('content in JsonDataView render', content);
    let renderedResult = '';
    let jsonResult = '';
    let cardTitle = '';
    rendered ? (cardTitle = 'Rendered View of Content') : (cardTitle = 'Raw View of Content');
    // let parser;
    // let xmlDoc;
    // const toString = '';
    // const fromString = '';
    switch (content.style) {
      case 'TEXT':
        renderedResult = content.value;
        jsonResult = '';
        break;
      case 'HTML':
        if (rendered) renderedResult = ReactHTMLParser(content.value);
        else renderedResult = content.value;

        jsonResult = '';
        break;
      case 'XML':
        // parser = new DOMParser();
        // xmlDoc = parser.parseFromString(content.value, 'text/xml');
        // console.log('render ', xmlDoc);
        // toString = xmlDoc.getElementsByTagName('to')[0].childNodes[0].nodeValue;
        // fromString = xmlDoc.getElementsByTagName('from')[0].childNodes[0].nodeValue;
        // renderedResult = (
        //   <div>
        //     <p>
        //       To:
        //       {toString}
        //     </p>
        //     <br />
        //     <p>From: {fromString}</p>
        //   </div>
        // );
        rendered
          ? (renderedResult = <code>{content.value}</code>)
          : (renderedResult = <span>{content.value}</span>);

        break;
      case 'JSON':
        jsonResult = content.value;
        console.log('json--->', jsonResult);
        renderedResult = '';
        break;
      default:
        break;
    }
    // console.log('result in JsonDataView render', result);
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={6}>
                <Card
                  title="Content Root"
                  content={
                    <div>
                      <p>
                        Row Id:
                        {content.rowId}
                      </p>
                      <br />
                      {jsonResult}
                    </div>
                  }
                />
              </Col>
              <Col md={6}>
                <Card
                  title={cardTitle}
                  content={rendered ? <div>{renderedResult}</div> : <code>{renderedResult}</code>}
                />
                <center>
                  <a onClick={this.viewClick} style={{ cursor: 'pointer' }}>
                    {rendered ? (
                      <span>Click to see Raw View</span>
                    ) : (
                      <span>Click to see Rendered View</span>
                    )}
                  </a>
                </center>
              </Col>
            </Row>
          </Grid>
        </Loader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    content: state.dashboardReducer.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContent: bindActionCreators(getContent, dispatch),
  };
}

JsonDataView.propTypes = {
  getContent: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JsonDataView);
