import React, {useState} from 'react';
import {Modal, Card, FormField, InputNumber, Button} from 'vienna-ui'
import {ApplicationUserStorageFactory} from "../common/user/ApplicationUserStorage";
import {apiEntrypoint} from "../config";

export const CreatePrediction = () => {
    const [is_open, setIsOpen] = useState(false);
    const [fixed_acidity, setFixedAcidity] = useState(0);
    const [volatile_acidity, setVolatileAcidity] = useState(0);
    const [citric_acid, setCitricAcid] = useState(0);
    const [residual_sugar, setResidualSugar] = useState(0);
    const [chlorides, setChlorides] = useState(0);
    const [free_sulfur_dioxide, setFreeSulfurDioxide] = useState(0);
    const [total_sulfur_dioxide, setTotalSulfurDioxide] = useState(0);
    const [density, setDensity] = useState(0);
    const [pH, setPH] = useState(0);
    const [sulphates, setSulphates] = useState(0);
    const [alcohol, setAlcohol] = useState(0);

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ApplicationUserStorageFactory.create().get()?.token}`
            },
            body: JSON.stringify({
                payload: {
                    fixed_acidity: fixed_acidity,
                    volatile_acidity: volatile_acidity,
                    citric_acid: citric_acid,
                    residual_sugar: residual_sugar,
                    chlorides: chlorides,
                    free_sulfur_dioxide: free_sulfur_dioxide,
                    total_sulfur_dioxide: total_sulfur_dioxide,
                    density: density,
                    pH: pH,
                    sulphates: sulphates,
                    alcohol: alcohol,
                }
            })
        };
        fetch(`${apiEntrypoint()}/model/task/create`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json().then((data) => {
                        alert(`Task: ${data['task_id']} create successful!`)
                        setIsOpen(false)
                    })
                }
                if (409 === response.status) {
                    return response.json().then((data) => {
                        alert(data['detail'])
                        setIsOpen(false)
                    })
                }
                alert("Error in create task")
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Create prediction</Button>
            <Modal isOpen={is_open} onClose={() => setIsOpen(false)}>
                <Modal.Layout>
                    <Modal.Head>
                        <Modal.Title>
                            <h2>Create prediction</h2>
                        </Modal.Title>{' '}
                    </Modal.Head>
                    <Modal.Body scroll={true}>
                        <Card>
                            <FormField>
                                <FormField.Label required>fixed acidity</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={fixed_acidity}
                                        /* @ts-ignore */
                                                 onChange={(value) => setFixedAcidity(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>volatile_acidity</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={volatile_acidity}
                                        /* @ts-ignore */
                                                 onChange={(value) => setVolatileAcidity(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>citric_acid</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={citric_acid}
                                        /* @ts-ignore */
                                                 onChange={(value) => setCitricAcid(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>residual_sugar</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={residual_sugar}
                                        /* @ts-ignore */
                                                 onChange={(value) => setResidualSugar(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>chlorides</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={chlorides}
                                        /* @ts-ignore */
                                                 onChange={(value) => setChlorides(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>free_sulfur_dioxide</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={free_sulfur_dioxide}
                                        /* @ts-ignore */
                                                 onChange={(value) => setFreeSulfurDioxide(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>total_sulfur_dioxide</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={total_sulfur_dioxide}
                                        /* @ts-ignore */
                                                 onChange={(value) => setTotalSulfurDioxide(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>density</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={density}
                                        /* @ts-ignore */
                                                 onChange={(value) => setDensity(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>pH</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={pH}
                                        /* @ts-ignore */
                                                 onChange={(value) => setPH(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>sulphates</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={sulphates}
                                        /* @ts-ignore */
                                                 onChange={(value) => setSulphates(value)}/>
                                </FormField.Content>
                            </FormField>
                            <FormField>
                                <FormField.Label required>alcohol</FormField.Label>
                                <FormField.Content>
                                    <InputNumber min={0} value={alcohol}
                                        /* @ts-ignore */
                                                 onChange={(value) => setAlcohol(value)}/>
                                </FormField.Content>
                            </FormField>
                            <Button name='test' design="accent" onClick={handleSubmit}>Submit</Button>
                        </Card>
                    </Modal.Body>
                </Modal.Layout>
            </Modal>
        </>
    )
}
