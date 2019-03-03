import React, { Component } from 'react';
import api from '../../../api';

export default class StudiesView extends Component {
  state = {
    studies: [],
  };

  componentDidMount() {
    this.getStudies();
  }

  getStudies = async () => {
    const studies = await api.studies.getAll();
    this.setState({ studies });
  };

  render() {
    const { studies } = this.state;
    return (
      <ul>{studies && studies.map((study) => <li key={study}>{study}</li>)}</ul>
    );
  }
}
