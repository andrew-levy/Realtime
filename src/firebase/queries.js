import * as firebase from 'firebase';
import 'firebase/firestore';

export const getAgentByEmail = async (email) => {
  const db = firebase.firestore();
  const agent = await db.collection('agents').where('email', '==', email).get();
  return agent;
};

export const getClientByID = async (id) => {
  const db = firebase.firestore();
  const clientData = await db.collection('clients').doc(id).get();
  return clientData;
};

export const getAgentByID = async (id) => {
  const db = firebase.firestore();
  const clientData = await db.collection('agents').doc(id).get();
  return clientData;
};

export const getClientsByAgent = async (agentID) => {
  const db = firebase.firestore();
  const clients = await db
    .collection('clients')
    .where('agentID', '==', agentID)
    .get();
  return clients;
};

export const addAgent = async (agent) => {
  const db = firebase.firestore();
  const agentsCollection = db.collection('agents');
  const response = await agentsCollection.add({
    fname: agent.fname,
    lname: agent.lname,
    email: agent.email,
  });
  return response;
};

export const addClient = async (client) => {
  const db = firebase.firestore();
  const clientsCollection = db.collection('clients');
  const response = await clientsCollection.add(client);
  return response;
};

export const updateClientByID = async (updatedClient, id) => {
  const db = firebase.firestore();
  const client = db.collection('clients');
  const response = await client.doc(id).set(updatedClient, { merge: true });
  return response;
};

export const deleteClientByID = async (id) => {
  const db = firebase.firestore();
  const repsonse = await db.collection('clients').doc(id).delete();
  return repsonse;
};
