import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Pack from './Pack';
import { render } from 'react-dom';
import { csv } from "d3-fetch";
import dataDensity from './density.csv';

class App extends Component {

  state = {
    index: 0,
    density: []
  };

  componentDidMount() {
    csv(dataDensity).then(density => {
      this.setState({ density: density})
    });
  }

  increase = () => {
    alert()
    if (this.state.index < 230) {
      this.setState({index: this.state.index + 20})
    }
  }

  decrease = () => {
    if (this.state.index > 20) {
      this.setState({index: this.state.index - 20})
    }
  }

  render() {
    const { index, density } = this.state;
    console.log(index)
    return (
      <div>
        <div>
          <button onClick={this.increase}> + 20</button>
          <button onClick={this.decrease}> - 20</button>
        </div>
        <div className="App" style={{ display: 'flex', flexWrap: 'wrap'}}>
          {
            density.length > 0 &&
            (
              <Fragment>
                <Pack index={index + 1} densityNumber={parseInt(density[index + 1].density_dots)} countryName={density[index + 1].country}/>
                <Pack index={index + 2} densityNumber={parseInt(density[index + 2].density_dots)} countryName={density[index + 2].country}/>
                <Pack index={index + 3} densityNumber={parseInt(density[index + 3].density_dots)} countryName={density[index + 3].country}/>
                <Pack index={ index+ 4} densityNumber={parseInt(density[index + 4].density_dots)} countryName={density[index + 4].country}/>
                <Pack index={ index+ 5} densityNumber={parseInt(density[index + 5].density_dots)} countryName={density[index + 5].country}/>
                <Pack index={ index+ 6} densityNumber={parseInt(density[index + 6].density_dots)} countryName={density[index + 6].country}/>
                <Pack index={ index+ 7} densityNumber={parseInt(density[index + 7].density_dots)} countryName={density[index + 7].country}/>
                <Pack index={ index+ 8} densityNumber={parseInt(density[index + 8].density_dots)} countryName={density[index + 8].country}/>
                <Pack index={ index+ 9} densityNumber={parseInt(density[index + 9].density_dots)} countryName={density[index + 9].country}/>
                <Pack index={ index+ 10} densityNumber={parseInt(density[index + 10].density_dots)} countryName={density[index + 10].country}/>
                <Pack index={index + 11} densityNumber={parseInt(density[index + 11].density_dots)} countryName={density[index + 11].country}/>
                <Pack index={index + 12} densityNumber={parseInt(density[index + 12].density_dots)} countryName={density[index + 12].country}/>
                <Pack index={index + 13} densityNumber={parseInt(density[index + 13].density_dots)} countryName={density[index + 13].country}/>
                <Pack index={index + 14} densityNumber={parseInt(density[index + 14].density_dots)} countryName={density[index + 14].country}/>
                <Pack index={index + 15} densityNumber={parseInt(density[index + 15].density_dots)} countryName={density[index + 15].country}/>
                <Pack index={index + 16} densityNumber={parseInt(density[index + 16].density_dots)} countryName={density[index + 16].country}/>
                <Pack index={index + 17} densityNumber={parseInt(density[index + 17].density_dots)} countryName={density[index + 17].country}/>
                <Pack index={index + 18} densityNumber={parseInt(density[index + 18].density_dots)} countryName={density[index+ 18].country}/>
                <Pack index={index + 19} densityNumber={parseInt(density[index + 19].density_dots)} countryName={density[index + 19].country}/>
                <Pack index={index + 20} densityNumber={parseInt(density[index + 20].density_dots)} countryName={density[index + 20].country}/>
              </Fragment>
            )
          }
          
        </div>
      </div>
    );
  }
}

export default App;
