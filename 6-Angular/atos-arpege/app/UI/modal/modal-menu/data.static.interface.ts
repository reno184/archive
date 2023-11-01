interface Link {
  url: string;
  value: string;
  title: string;
  outlet: string;
  icon: string;
  queryParams?: any;
}

interface Section {
  title: string;
  icon: string;
  roles: string[];
  links: Link[];
}

export interface StaticModalMenu {
  sections: Section[];
}
