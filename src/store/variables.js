import variablesservice from '@/apis/variablesservice'

export default {
  state: {
    variables: []
  },

  getters: {
    variables (state) {
      return state.variables;
    },

    respuestapositivo: (state) => {
      if (state.variables && state.variables.length>0) {
        return state.variables.find(p => p.nombre==='RESPUESTA_POSITIVO');
      } else {
        return {valor:null};
      }
    },

    respuestanegativo: (state) => {
      if (state.variables && state.variables.length>0) {
        return state.variables.find(p => p.nombre==='RESPUESTA_NEGATIVO');
      } else {
        return {valor:null};
      }
    }
  },
  actions: {
    fetchVariables ({commit}) {
      variablesservice.getVariables()
        .then((respuesta) => {
          commit('setVariables', {variables: respuesta.data})
        })
        .catch((error) => {
          commit('setVariables', {variables: error.data})
        });
    },
    saveVariables (state) {
      return variablesservice.saveVariables({variables: state.getters.variables});
    }
  },
  mutations: {
    setVariables(state, response) {
      state.variables = response.variables;
    },

  }
};
