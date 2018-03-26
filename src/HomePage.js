import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

// My components
import UserPageCreator from './UserPageCreation';
import UserPage from './UserPage';

var FileSaver = require('file-saver')

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPages: [],
      settings: false,
      tempSuffix: '',
      suffix: ''
    };

    // binds
    this.cancelPageCreation = this.cancelPageCreation.bind(this);
    this.submitPageCreation = this.submitPageCreation.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
    this.createSubPage = this.createSubPage.bind(this);
    this.changePageName = this.changePageName.bind(this);
    this.deleteActivePage = this.deleteActivePage.bind(this);
    this.changePostName = this.changePostName.bind(this);
    this.handleSuffixChange = this.handleSuffixChange.bind(this);
    this.submitSuffix = this.submitSuffix.bind(this);
    this.cancel = this.cancel.bind(this);
    this.exportJSON = this.exportJSON.bind(this);
    this.importJSON = this.importJSON.bind(this);
  }

  cancelPageCreation() {
    this.setState(() => ({creatingNewPage: false}));
  }

  submitPageCreation(pageName) {
    let newUP = this.state.userPages.slice();
    newUP.push({name: pageName});
    this.setState(() => ({
      userPages: newUP,
    }));
    this.props.doneCreatingPage();
  }

  pageClicked(page, e) {
    this.props.pageClicked(page, e)
    //  this.setState(() => ({userPage: page}));
    this.props.createBack();
  }

  createSubPage(subName) {
    let userPagesN = this.state.userPages.slice();
    let index = userPagesN.indexOf(this.props.userPage);
    if (userPagesN[index].subpages === undefined) {
      userPagesN[index].subpages = [];
    }
    userPagesN[index].subpages.push({name: subName});

    this.setState(() => ({userPages: userPagesN}));
    this.props.updateUserPage(userPagesN[index]);
  }

  changePageName(newPageName) {
    let userPagesN = this.state.userPages.slice();
    let index = userPagesN.indexOf(this.props.userPage);
    userPagesN[index].name = newPageName;

    this.setState(() => ({userPages: userPagesN}));
    this.props.updateUserPage(userPagesN[index]);
  }

  changePostName(newUserPage) {
    let userPagesN = this.state.userPages.slice();
    let index = userPagesN.indexOf(this.props.userPage);
    userPagesN[index] = Object.assign({}, newUserPage);

    this.setState(() => ({userPages: userPagesN}));
    this.props.updateUserPage(userPagesN[index]);
  }

  deleteActivePage() {
    let userPagesN = this.state.userPages.slice();
    let index = userPagesN.indexOf(this.props.userPage);

    delete userPagesN[index];

    this.setState(() => ({userPages: userPagesN}));
    this.props.updateUserPage(null);
  }

  handleSuffixChange(e){
    this.setState({tempSuffix: e.target.value});
  }

  submitSuffix(e) {
    e.preventDefault();
    this.setState(() => ({
      settings: false,
      suffix: this.state.tempSuffix,
      tempSuffix: ''
    }));
  }

  cancel() {
    this.setState(() => ({
      settings: false,
      tempSuffix: ''
    }));
  }

  exportJSON() {
    let jsonData = '{' + 
    '"UserPages": ' + JSON.stringify(this.state.userPages) + 
    ', "suffix": ' +
     '"' + this.state.suffix + '"' +
    '}';
    var blob = new Blob([jsonData], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, 'project-data.json')
  }

  importJSON(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];

    var fr = new FileReader();

    var that = this;
    fr.onload = function () {
      let jsonObj = JSON.parse(this.result);
      that.setState(() => ({
        userPages: jsonObj.UserPages.slice(),
        suffix: jsonObj.suffix,
        tempSuffix: jsonObj.suffix
      }));
    }

    fr.readAsText(file);
  }

  render() {
    return (
      <div className="home">
        <div>
          { !this.props.creatingNewPage && !this.props.userPage && !this.state.settings ?
            <div>
              <span>
                <a href="#Settings"><Button className="holySpirit" bsStyle="info" onClick={() => (this.setState(() => ({settings: true, tempSuffix: this.state.suffix})))}>Settings</Button></a>
                <Button bsStyle="primary" onClick={this.props.createPagePage}>+</Button>
              </span>
              <div id="userPages">
                <h2><p>User Created Pages</p></h2>
                <div className="userPages">
                  <h3>
                    {this.state.userPages.map((page, index) => (
                      <p className="userPage" key={page.toString() + index} onClick={(e) => (this.props.pageClicked(page, e))}>{page.name}</p>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          : !this.props.userPage && !this.state.settings &&
            <div>
              <UserPageCreator submit={this.submitPageCreation} cancel={this.cancelPageCreation} />
            </div>
          }
        </div>
        { this.props.userPage && !this.state.settings &&
          <div className="specifiedPage">
            <UserPage suf={this.state.suffix} updateUserPage={this.changePostName} deletePage={this.deleteActivePage} changePageName={this.changePageName} userPage={this.props.userPage} newSubPage={this.createSubPage} />
          </div>
        }
        { this.state.settings &&
          <div>
            <span>
              <Button className="holySpirit" bsStyle="info" onClick={this.exportJSON}>Export JSON</Button>
              <p>Import a json file: </p><input className="input" type="file" ref="fileUploader" onChange={this.importJSON} />
            </span>
            <form onSubmit={this.submitSuffix} id="suffForm">
              <label>
                Add a suffix to all posts: 
                <input autoFocus={true} type="text" value={this.state.tempSuffix} onChange={this.handleSuffixChange} />
              </label>
            </form>
            <a href="#Home"><Button bsStyle="success" form="suffForm" type="submit">Submit</Button></a>
            <a href="#Home"><Button className="holySpirit" bsStyle="info" onClick={this.cancel}>Back</Button></a>
            <br />
          </div>
        }
      </div>
    );
  }
}

export default HomePage;
