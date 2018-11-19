export default [
  {
    id: '0',
    title: 'Syslog',
    childFn: 'sysLogTab',
    formConfig: [
      {
        name: 'displayName',
        label: 'Display Name',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'sourceHost',
        label: 'IP or HostName',
        widget: 'input',
        type: 'text',
        defaultValue: ''
      },
      {
        name: 'logFolder',
        label: 'Log Folder',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'logFilename',
        label: 'File Name Format',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'port',
        label: 'SysLog Port',
        widget: 'input',
        type: 'text'
      }
    ]
  },
  {
    id: '1',
    title: 'Archive',
    childFn: 'archiveTab',
    formConfig: [
      {
        name: 'archiveEnabled',
        label: 'Archive Logs',
        widget: 'toggleButton'
      },
      {
        name: 'archiveFolder',
        label: 'Archive Folder',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'archivePeriod',
        label: 'Archive files older than (days)',
        widget: 'input',
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    title: 'Forwarding',
    childFn: 'forwardingTab',
    formConfig: [
      {
        name: 'forwardEnabled',
        label: 'Forward Logs',
        widget: 'toggleButton'
      },
      {
        name: 'forwardTransport',
        widget: 'inputGroup',
        group: [
          {
            id: 0,
            widget: 'input',
            type: 'radio',
            label: 'UDP'
          },
          {
            id: 1,
            widget: 'input',
            type: 'radio',
            label: 'TCP'
          }
        ]
      },
      {
        name: 'forwardHost',
        label: 'Forward To Host',
        widget: 'input',
        type: 'text'
      },
      {
        name: 'forwardPort',
        label: 'Forward Port',
        widget: 'input',
        type: 'text'
      }
    ]
  }
];
