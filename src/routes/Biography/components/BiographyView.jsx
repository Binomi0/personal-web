import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Analitycs from '../../../utils/analitycs/google-analitycs';

import { StyledSection } from '../styles';
// import myFile from '../../../assets/files/myFile.csv';
import fotoPiscina from '../../../assets/img/fintonic-piscina.jpeg';
import videoPiscina from '../../../assets/video/piscina-fintonic.mp4';

function RenderStyledSection({ context }) {
  return (
    <StyledSection>
      <Typography color="secondary">
        Nací en Madrid el 26 de Marzo de 1978
      </Typography>
      <Typography color="secondary">
        Desde pequeño me ha apasionado la informática y la tecnología, recuerdo
        tener alrededor de 8 o 9 años y fascinarme un monitor verde con
        letritas...
      </Typography>
    </StyledSection>
  );
}

export default class BiographyView extends Component {
  constructor() {
    super();

    this.videoRef = React.createRef();
  }
  componentDidMount() {
    Analitycs.pageview('/biography', 'Biografía');
  }

  handleVideoClick = () => {
    console.log('Has hecho clic');
    if (this.context.value) {
      this.videoRef.current.play();
    }
    this.context.changeValue(true);
  };
  // handleImgDownload = () => {
  //   const a = document.createElement('a');
  //   a.download = 'my-file.csv';
  //   a.href = `data:text/csv;charset=UTF-8,/${encodeURIComponent(myFile)}`;
  //   a.click();
  // };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.biography}>
        <Typography color="secondary">
          Nací en Madrid el 26 de Marzo de 1978
        </Typography>
        <Typography color="secondary" paragraph variant="h6">
          Desde pequeño me apasionaba la tecnología, recuerdo tener alrededor de
          8 o 9 años y fascinarme un monitor verde con letritas...
        </Typography>
        <Typography color="secondary">To be continued...</Typography>
        <video
          ref={this.videoRef}
          onClick={this.handleVideoClick}
          width="1024"
          height="768"
          muted
          poster={fotoPiscina}
        >
          <source src={videoPiscina} />
        </video>
        {/* <img
          onClick={this.handleImgDownload}
          className={classes.imagen}
          src={fotoPiscina}
          alt="fintonic-piscina"
        /> */}
        <RenderStyledSection context={this.context} />
      </div>
    );
  }
}
