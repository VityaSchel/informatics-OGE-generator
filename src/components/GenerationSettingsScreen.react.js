import React from 'react';
import styles from '../styles/GenerationSettingsScreen.style.js';
import {
  InputGroup,
  Input,
  Button
 } from 'reactstrap';

class GenerationSettingsScreen extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div style={styles.bg} className='generator-form-gallery'>
        <Form ongenerate={this.props.ongenerate}/>
        <Gallery />
      </div>
    )
  }
}

class Form extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div style={styles.form}>
        <Heading />
        {'\n'}
        <Generator ongenerate={this.props.ongenerate}/>
      </div>
    )
  }
}

class Heading extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <>
        <h1>Удобный генератор ОГЭ по информатике</h1>
        <p>Тренажер следующего поколения, который поможет
           вам подготовиться к ОГЭ по информатике и сдать
           экзамены на лучший балл</p>
      </>
    )
  }
}

class Generator extends React.Component {
  constructor (props){
    super(props);
    this.refSeed = React.createRef();
  }

  render(){
    return (
      <>
        <InputGroup>
          <Input placeholder="Кол-во вариантов (необязательно)" type='number' min={1} max={1000}/>
          <Button color="secondary" onClick={() => this.props.ongenerate(this.refSeed)}>Сгенерировать</Button>
        </InputGroup>
        {'\n'}
        <Input placeholder="seed варианта (необязательно)" innerRef={this.refSeed} />
      </>
    )
  }
}

class Gallery extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div style={styles.gallery}>
        <img src='https://picsum.photos/300/200' alt='Демонстрация работы сайта' width={300} height={200}/>
        <img src='https://picsum.photos/300/200?' alt='Демонстрация работы сайта' width={300} height={200}/>
      </div>
    )
  }
}

export default GenerationSettingsScreen;