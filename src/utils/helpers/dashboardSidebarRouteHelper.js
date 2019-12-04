import KnowledgeBases from '../../containers/Dashboard/KnowledgeBases';
import StructuredDatasets from '../../containers/Dashboard/StructuredDatasets';
import Regulation from '../../containers/Dashboard/Regulation';
import RawContentsets from '../../containers/Dashboard/RawContentsets';
import AcquisitionJobs from '../../containers/Dashboard/AcquisitionJobs';

const dashboardSidebarRouteHelper = [
  {
    path: '/dashboard/knowledge-bases',
    name: 'Knowledge Bases',
    icon: 'ti-book',
    component: KnowledgeBases,
    exact: true,
  },
  {
    path: '/dashboard/structured-datasets',
    name: 'Structured Datasets',
    icon: 'ti-view-list-alt',
    component: StructuredDatasets,
    exact: true,
  },
  {
    path: '/dashboard/raw-contentsets',
    name: 'Raw Content Sets',
    icon: 'ti-folder',
    component: RawContentsets,
    exact: true,
  },
  {
    path: '/dashboard/acquisition-jobs',
    name: 'Acquisition Jobs',
    icon: 'ti-server',
    component: AcquisitionJobs,
    exact: true,
  },
  {
    redirect: true,
    path: '/dashboard',
    pathTo: '/dashboard/knowledge-bases',
    name: 'Knowledge Bases',
    exact: true,
  },
  {
    path: '/dashboard/regulation',
    name: 'Regulation',
    icon: 'ti-view-list-alt',
    component: Regulation,
    exact: true,
  },
];
export default dashboardSidebarRouteHelper;
