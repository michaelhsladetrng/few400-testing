import { SuperBasicComponent } from './super-basic.component';
import { DefaultsService } from './defaults.service';

describe('testing a component class directly', () => {

  let component: SuperBasicComponent;

  beforeEach(() => {
    component = new SuperBasicComponent(new DefaultsService());
    component.ngOnInit();
  });
  it('has the default word of tacos', () => {

    expect(component.word).toBe('Chimichanga');
  });

  it('changes it to upper case when you call the method', () => {
    component.makeUpper();
    expect(component.word).toBe('CHIMICHANGA');
  });
});
