
export interface ConfigDatasModel {
  logo: string;
  version: string;
  providers: {
    basic: {
      url_part2: string;
      url_part3: string;
      url_part3_test: string;
      attribution: string;
    };
    satellite: {
      url_part2: string;
      url_part3: string;
      url_part3_test: string;
      attribution: string;
    };
  };


  trackType: {
    track: any;
    unit: any;
  };

  trackActive: {
    active: any;
    inactive: any;
  };

  trackKill: {
    alive: any;
    killed: any;
  };

  signaux: {
    TN: any;
    IFF1: any;
    IFF3: any;
    VCS: any;
  };
}
