import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import dashboardSidebarRoutes from '../utils/helpers/dashboardSidebarRouteHelper';
import Profile from '../containers/Dashboard/Profile';
import Cuts from '../containers/Dashboard/Cuts';
import CycleDetails from '../containers/Dashboard/CycleDetails';
import AcquisitionJobs from '../containers/Dashboard/AcquisitionJobs';
import JsonDataView from '../containers/Dashboard/JsonDataView';
import Cycles from '../containers/Dashboard/Cycles';
import GetHelp from '../containers/Dashboard/GetHelp';
import knowledgeDetails from '../containers/Dashboard/KnowledgeDetails';

class DashboardRoute extends Component {
  render() {
    return (
      <Switch>
        {dashboardSidebarRoutes.map((prop, key) => {
          if (prop.collapse) {
            return prop.views.map((prop, key) => {
              if (prop.name === 'Notifications') {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => <prop.component {...routeProps} />}
                  />
                );
              }
              return <Route path={prop.path} component={prop.component} key={key} />;
            });
          }
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.pathTo} exact={prop.exact} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
        })}
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard/structured-datasets/detail" component={Cuts} />
        <Route exact path="/dashboard/cycle-detail" component={CycleDetails} />
        <Route exact path="/dashboard/cycle-detail/:stepNumber" component={CycleDetails} />
        <Route exact path="/dashboard/data" component={JsonDataView} />
        <Route exact path="/dashboard/acquisition-jobs/:jobGroupId" component={AcquisitionJobs} />
        <Route exact path="/dashboard/cycles/:jobGroupName/:jobGroupId" component={Cycles} />
        <Route exact path="/dashboard/getHelp" component={GetHelp} />
        <Route exact path="/dashboard/knowledge-bases/:knowledgeId" component={knowledgeDetails} />
      </Switch>
    );
  }
}

export default DashboardRoute;
