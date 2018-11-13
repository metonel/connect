import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "aeadb80092e5ae538192",
      clientSecret: "095484b5dd4a95a82fc97080fc0e8b72ee88c444",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.MyRef) {
          //cateodata da eroare fara ref in return
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="clo-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>

            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>

            <span className="badge badge-success">Forks: {repo.forks}</span>
          </div>
        </div>
      </div>
    ));
    return (
      //cateodata da eroare fara refs la fetch, vezi line 26

      <div ref="MyRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGit.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGit;
