import React, { Component } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import Button from "../Button";

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  console.log(time,minutes);
  time -= minutes * 60;
  console.log(time);
  let seconds = parseInt(time % 60, 10);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10
    ? `0${seconds}`
    : seconds}`;

}



class Timer extends Component {
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    console.log("componentWillReceiveProps:",currentProps.isPlaying
        ,nextProps.isPlaying);
    //current false && next true
    if(currentProps.isPlaying===false && nextProps.isPlaying===true){
      const timerInterval = setInterval(()=>{
        currentProps.addSecond();
      },1000);
      this.setState({
        timerInterval
      });
    }else if(currentProps.isPlaying===true && nextProps.isPlaying===false){
      clearInterval(this.state.timerInterval);
    }
  }

  render() {
    console.log("Timer:",this.props);
    const {
      isPlaying,
      elapsedTime,
      timerDuration,
      startTimer,
      restartTimer
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.upper}>
          <Text style={styles.time}>
             {formatTime(timerDuration-elapsedTime)}
          </Text>
        </View>
        <View style={styles.lower}>
          {!isPlaying ?
              <Button iconName={"play-circle"} onPress={()=>{startTimer()}}/>
          :
              <Button iconName={"stop-circle"} onPress={()=>{restartTimer()}} />
          }


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CE0B24"
  },
  lower: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 25,
    paddingRight: 25
  },
  upper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  time: {
    color: "white",
    fontSize: 120,
    fontWeight: "100"
  }
});

export default Timer;
