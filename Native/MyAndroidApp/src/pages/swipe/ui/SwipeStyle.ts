import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const SwipeStyle = StyleSheet.create({
    pageContainer:
    {

    },
    gameField:
    {
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        // justifyContent: "space-between",
    },
    tile:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#666",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    tileCorrect:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#6acc90",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    tileCorrect2:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#788f23",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    tileCorrect3:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#857700",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    tileCorrect4:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#c23b3b",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    textBlock:
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20.0,
    },
    tileContainer:
    {
        height: 80.0,
        width: 80.0,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
        position: "absolute",
    },
    difficultyContainer:
    {
        marginVertical: 10.0,
    },
    difficultySelector:
    {
        backgroundColor: "#3b3b3b",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    difficultyItem:
    {
        backgroundColor: "#666666",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5.0,
        opacity: 0.5,
    },
    bottomText:
    {
        fontSize: 20.0,
        color: "#ffffff"
    },
    difficultyItemSelected:
    {
        flex: 1,
        backgroundColor: "#6acc90",
        alignItems: "center",
        justifyContent: "center",
        margin: 5.0,
    },
    difficultyItemSelected2:
    {
        flex: 1,
        backgroundColor: "#788f23",
        alignItems: "center",
        justifyContent: "center",
        margin: 5.0,
    },
    difficultyItemSelected3:
    {
        flex: 1,
        backgroundColor: "#857700",
        alignItems: "center",
        justifyContent: "center",
        margin: 5.0,
    },
    difficultyItemSelected4:
    {
        flex: 1,
        backgroundColor: "#c23b3b",
        alignItems: "center",
        justifyContent: "center",
        margin: 5.0,
    },
    textCorrect:
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20.0,
        color: "green",
    },
    winContainer:
    {
        alignItems: 'center', 
        flex: 1,
        minWidth: 50,
    },
    winText:
    {
        color: "#ffffff",
        fontSize: 18.0,
    },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#313131',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#ffffff',
  },
  modalTextTitle:
  {
    marginBottom: 2,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  modalTitle:
  {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default SwipeStyle;
