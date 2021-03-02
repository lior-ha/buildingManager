import AddTenantsForm from '../../../components/add-tenants-form/add-tenants-form.component';
import FormBox from '../../../components/form-box/form-box.component';

const AddTenants = () => (
    <main className="mainWrapper">
        <h1>מבצע קדש 11</h1>
        <section>
            <FormBox form={<AddTenantsForm />} title="הוסף דיירים" />
        </section>
    </main>
)

export default AddTenants;