import React, { FormEvent, useState } from 'react';
import 'halfmoon/css/halfmoon-variables.min.css';

import { string, object, InferType } from "yup"
import { gql, useMutation, useQuery } from '@apollo/client';
import Schema from './modules/schema/Schema';

let schema = object().shape({
  username: string().required(),
  _id: string().required()
})

type BasicUser = InferType<typeof schema>

const keys = Object.keys(schema?.fields || {})

const data = keys.reduce((acc, cur) => {
  return {...acc, [cur]: ""}
}, {})

const mutationAsAString = `mutation AddBasicUser($username: String!) {
  insert_basic_user(objects: {username: $username}) {
    returning {
      _id
    }
  }
}`

const ADD_BASIC_USER = gql`${mutationAsAString}`

const BasicUserSchema = Schema.create(schema, "basic_user")

function App() {
  const [formData, setFormData] = useState<any>(data)
  const [addBasicUser] = useMutation(ADD_BASIC_USER);
  const { loading, error, data: BUData } = useQuery(BasicUserSchema.allRecords);

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    addBasicUser({
      variables: {
        username: formData.username
      }
    })
  }

  return (
    <div className="App container mt-20">
      <form onSubmit={submitForm} className="w-400 mw-full mx-auto">
        {keys.map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key} className="required">
              {key}
            </label>
            <input className="form-control" type="text" value={formData[key]} name={key} onChange={(e) => {
              e.persist()
              setFormData((prev: any) => ({
                ...prev,
                [key]: e.target.value
              }))
            }} />
          </div>
        ))}
        <hr />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      {loading && "Loading..."}
      {error && "Error..."}
      {!error && !loading && (
        <pre>
          {JSON.stringify(BUData)}
        </pre>
      )}
    </div>
  );
}

export default App;
