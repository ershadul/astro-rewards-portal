import React, { Component } from "react";
import axios from "axios";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ClipLoader } from 'react-spinners';

export default class RewardCreate extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubTitle= this.onChangeSubTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStartDatetime = this.onChangeStartDatetime.bind(this);
    this.onChangeEndDatetime = this.onChangeEndDatetime.bind(this);
    this.onChangeRedemptionType = this.onChangeRedemptionType.bind(this);
    this.onChangeLocationUrl = this.onChangeLocationUrl.bind(this);
    this.onChangeThumbnail = this.onChangeThumbnail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    const today = new Date();
    this.state = {
      companies: [],
      company: '',
      title: '',
      subTitle: '',
      description: EditorState.createEmpty(),
      thumbnail: '',
      startDatetime: this.formatDate(new Date()),
      endDatetime: this.formatDate(new Date(today.setDate(today.getDate() + 30))),
      redemptionType: 'online',
      locationUrl: '',
      submitting: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/v1/companies")
      .then(response => {
        this.setState({ companies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  formatDate(d) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) { month = '0' + month };
    if (day.length < 2) { day = '0' + day };
    return [year, month, day].join('-');
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeSubTitle(e) {
    this.setState({
      subTitle: e.target.value
    });
  }

  onChangeDescription(editorState) {
    this.setState({
      description: editorState
    });
  }

  onChangeThumbnail(e) {
    this.setState({
      thumbnail: e.target.files[0]
    });
  }

  onChangeStartDatetime(e) {
    this.setState({
      startDatetime: e
    });
  }

  onChangeEndDatetime(e) {
    this.setState({
      endDatetime: e
    });
  }

  onChangeRedemptionType(e) {
    this.setState({
      redemptionType: e.target.value
    });
  }

  onChangeLocationUrl(e) {
    this.setState({
      locationUrl: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('company', this.state.company);
    data.append('thumbnail', this.state.thumbnail);
    data.append('title', this.state.title);
    data.append('subTitle', this.state.subTitle);
    data.append('description', draftToHtml(convertToRaw(this.state.description.getCurrentContent())));
    data.append('locationUrl', this.state.locationUrl);
    data.append('redemptionType', this.state.redemptionType);
    data.append('redemptionPeriodStart', this.state.startDatetime);
    data.append('redemptionPeriodEnd', this.state.endDatetime);

    this.setState({submitting: true});
    axios
      .post("/rewards",
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(res => {
        console.log(res.data);
        this.setState({submitting: false});
        this.props.history.push("/rewards");
      }).catch(err => {
        this.setState({submitting: false});
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Create reward</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company: *</label>
            <select className="form-control"
              onChange={this.onChangeCompany}>
              <option value="">Select company</option>
              {this.state.companies.map((company) => <option key={company._id} value={company._id}>{company.name}</option>)}
            </select>
            </div>
          <div className="form-group">
            <label>Title: *</label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Sub-Title: *</label>
            <input
              type="text"
              className="form-control"
              value={this.state.subTitle}
              onChange={this.onChangeSubTitle}
            />
          </div>
          <div>
            <label>Description: *</label>
            <Editor
              editorState={this.state.description}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Thumbnail: *</label>
            <input
              type="file"
              className="form-control"
              onChange={this.onChangeThumbnail}
            />
          </div>
          <div className="form-group">
            <label>Start Date (YYYY-mm-dd): *</label>
            <div>
              <input
                className="form-control"
                type="text"
                onChange={this.onChangeStartDatetime}
                value={this.state.startDatetime}
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Date (YYYY-mm-dd): *</label>
            <div>
              <input
                className="form-control"
                type="text"
                onChange={this.onChangeEndDatetime}
                value={this.state.endDatetime}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Redemption Type: *</label>
            <select className="form-control"
              onChange={this.onChangeRedemptionType}>
              <option value="online">Online</option>
              <option value="store">Store</option>
            </select>
          </div>
          <div className="form-group">
            <label>Store Location URL (Applicable if Redemption Type is Store): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.locationUrl}
              onChange={this.onChangeLocationUrl}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Reward"
              className="btn btn-primary"
              disabled={this.state.submitting}
            />
            
            <ClipLoader
              style={{display: 'block', margin: '10px 0 0 20px'}}
              sizeUnit={"px"}
              size={40}
              color={'#123abc'}
              loading={this.state.submitting}
            />
          </div>
        </form>
      </div>
    );
  }
}
