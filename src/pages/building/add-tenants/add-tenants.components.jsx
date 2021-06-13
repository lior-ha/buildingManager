import AddTenantsForm from '../../../components/add-tenants-form/add-tenants-form.component';
import FormBox from '../../../components/form-box/form-box.component';

const AddTenants = () => (
    <section>
        <h1>מבצע קדש 11</h1>
        <FormBox form={<AddTenantsForm />} title="הוסף דיירים" />
    </section>
)

export default AddTenants;