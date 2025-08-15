import { createSlice } from '@reduxjs/toolkit'
import toast  from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[] 
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify( state.pastes))
      toast.success("Paste created successfully")
    },
    updateToPastes: (state,action) => {
    
      const paste = action.payload;
      let temp = state.pastes.findIndex( (item) => item.id === paste.id );

      //find a valid index
      if(temp >= 0 )
      {
        state.pastes[temp] = paste;
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));

        toast.success("Paste updated successfully");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes  = [];
    },
    removeFromPastes: (state , action) => {
      const pasteId = action.payload;
      let temp = state.pastes.findIndex( (item) => item.id === pasteId );

      //find a valid index
      if(temp >= 0 )
      {
        //from index temp remove 1 element
        state.pastes.splice(temp, 1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));
        toast.success("paste deleted");
      } 
    },
  },
})
// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer