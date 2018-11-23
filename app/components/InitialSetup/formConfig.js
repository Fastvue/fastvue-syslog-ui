const formConfig = [
  {
    name: 'listeningPorts',
    label: 'Listening ports',
    widget: 'input',
    type: 'text'
  },
  {
    label: 'Auto-Discover Syslog Sources',
    child: [
      {
        name: 'autoDiscover',
        desc:
          'Listen for syslog traffic on the following ports. (Separate multiple ports with a comma)',
        widget: 'input',
        type: 'text'
      }
    ]
  },
  {
    label: 'Authentication',
    child: [
      {
        name: 'authEnable',
        label: 'Require a password to access the syslog server interface.',
        widget: 'input',
        type: 'checkbox'
      },
      {
        name: 'username',
        label: 'Username',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'password',
        label: 'Password',
        widget: 'input',
        type: 'password'
      }
    ]
  },
  {
    label: 'Storage',
    desc:
      'Specify the default location to store new log files and archives of old log files.',
    child: [
      {
        name: 'authEnable',
        label: 'Require a password to access the syslog server interface.',
        widget: 'input',
        type: 'checkbox'
      },
      {
        name: 'logs',
        label: 'Logs',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'archives',
        label: 'Archives',
        widget: 'input',
        type: 'text'
      }
    ]
  }
];

export default formConfig;
