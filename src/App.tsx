import React, { FormEvent, useState } from "react"
import "halfmoon/css/halfmoon-variables.min.css"

import { string, object } from "yup"
import { useMutation, useQuery } from "@apollo/client"
import schemas from "./lib/schema"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/home"
import SchemaIndex from "./pages/schema"
import AppSidebar from "./components/AppSidebar"

let schema = object().shape({
	username: string().required(),
	_id: string().required(),
})

const keys = Object.keys(schema?.fields || {})

const data = keys.reduce((acc, cur) => {
	return { ...acc, [cur]: "" }
}, {})

function App() {
	const [formData, setFormData] = useState<any>(data)
	const [addBasicUser] = useMutation(schemas.basic_user.createOneQuery)
	const { loading, error, data: BUData } = useQuery(
		schemas.basic_user.readByPKQuery,
		{
			variables: {
				id: 1,
			},
		}
	)

	const submitForm = async (e: FormEvent) => {
		e.preventDefault()
		const rtn = await addBasicUser({
			variables: {
				username: formData.username,
			},
		})

		console.log(rtn)
	}

	return (
		<div className="page-wrapper with-navbar with-sidebar">
			<nav className="navbar"></nav>
			<AppSidebar />
			<div className="content-wrapper pt-20 px-20">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/:schema">
						<SchemaIndex />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default App

/*

<form onSubmit={submitForm} className="container">
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

*/
