import ReactDOM from 'react-dom/client'
import ReduxRoot from './reduxAction/rootRedux.tsx'
import './Style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxRoot />
)
