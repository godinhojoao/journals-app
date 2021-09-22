export interface SignPageInterface {
  title: string;
  navigationPhrase: string;
  navigationLink: string;
  fields: String[];
  initialValues: Record<string, string>;
  placeholders: Record<string, string>;
  buttonTitle: string;
  pageType: string;
  validationSchema: object;
  handleSubmit: Function;
}
