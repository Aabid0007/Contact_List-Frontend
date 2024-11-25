// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


// const deleteContact = createAsyncThunk("deleteContact", async (id) => {
//     try {
//         const response = await axios.delete(`https://contact-list-backend-0zle.onrender.com/api/contacts/${id}`);
//         console.log(response.data);
//         return id;
//     } catch (error) {
//         throw error
//     }
// });

// const deleteData = createSlice({
//     name: 'delete',
//     initialState: {
//       data: [],
//       error: '',
//       loading: false
//     },

//     extraReducers: (builder) => {
//         builder
//         .addCase(deleteContact.pending, (state) => {
//             state.loading = true;
//             state.error='';
//         })
//         .addCase(deleteContact.fulfilled, (state, action) => {
//             state.loading = false;
//             state.data = state.data.filter(contact => contact.id !== action.payload);
//                   })
//           .addCase(deleteContact.rejected, (state, action) => {
//             state.loading = false;
//             state.error = "Some error occurred";
//           });

//     }
// });

// export { deleteContact };
// export default deleteData.reducer;