const GetHandout = async (
    sessionCookie, 
    API_URL, 
    gestational_age, 
    birth_weight, 
    singleton, 
    steroids,
    sex,
    ethnicity,
    ruptured_membrane,
    length_of_ruptured_membrane,
    pre_eclampsia,
    clinician_notes,
    literacy_level,
    translate,
    language
) => {
    const document = {
        date: new Date(),
        userid: sessionCookie,
        inputFields: {
            gestational_age: gestational_age,
            birth_weight: birth_weight,
            singleton: singleton,
            steroids: steroids,
            sex: sex,
            ethnicity: ethnicity,
            ruptured_membrane: ruptured_membrane,
            length_of_ruptured_membrane:length_of_ruptured_membrane,
            pre_eclampsia:pre_eclampsia,
            clinician_notes:clinician_notes
        },
        outputOptions:{
            literacy_level:literacy_level,
            translate:translate,
            language:language
        }
    }
    try {
        console.log(document)
        const response = await fetch(`${API_URL}/createDocs`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                id: sessionCookie
            },
            body: JSON.stringify(document),
        })
        if (!response.ok) {
            throw new Error(`HTTP error sending data to server! \n **************************\nstatus: ${response.status}`)
        }
        // console.log(response)
        let data = await response.json()
        // console.log("data: ", data.choices[0].message.content.toString())
        return data.choices[0].message.content.toString()
        
    } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    }
}

export default GetHandout;