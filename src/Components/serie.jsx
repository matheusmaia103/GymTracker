import {P} from '../styles/indexStyles'
import { ArrowForwardIosRounded } from '@mui/icons-material';

export default function Serie({ serie }) {
  return (
    <P>
        <span>
          Série {serie.name} - {serie.titulo}
        </span>
        <ArrowForwardIosRounded />
      </P>
  );
} 