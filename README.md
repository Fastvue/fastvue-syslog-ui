# fastvue-syslog-ui
Fastvue Syslog User Interface

This repo is the code for the User Interface of [Fastvue Syslog](https://www.fastvue.co/syslog "Fastvue Syslog"), a simple, unlimited & free Syslog Server for Windows. This is _not_ the full Fastvue Syslog code - just the User Interface.

This interface interacts with the [Fastvue Syslog API](https://docs.fastvue.co/fastvue/syslog/api/2.0/ "Fastvue Syslog API").

# Quick Start

## 1. Download and Install Fastvue Syslog (v2.0 and above)

Go to the [Fastvue Syslog download page](https://www.fastvue.co/syslog/download "Fastvue Syslog") to download and install Fastvue Syslog.

## 2. Configure Fastvue Syslog to respond to requests from a different user interface

To allow Fastvue Syslog to use your version of this Fastvue Syslog User Interface, you need to make a few configuration changes. To do this:

1. Navigate to `"C:\ProgramData\Fastvue\Syslog Server\"` and open the `Settings.json` file in your favourite text editor.
2. Add these four lines at the root of the settings object:
```
{
  ...
  
	"CorsAllowOrigin":"http://localhost:3000",
	"CorsAllowHeaders":"*",
	"CorsAllowMethods":"GET POST",
	"CorsAllowCredentials":"true"
}
```

## 3. Clone and Run your version of the Fastvue Syslog UI.

Now that Fastvue Syslog has been configured to respond to requests for a separate user interface hosted at `localhost:3000`, you can clone and run this user interface at that location. 

At the command line:

```
git clone https://github.com/Fastvue/fastvue-syslog-ui.git
cd fastvue-syslog-ui
npm install && npm start
```

Open http://localhost:3000/ to view the website.

You should now be able to make changes to your local version of the Fastvue Syslog UI code and see these changes reflected in the User Interface.

Use the [Fastvue Syslog API documentation](https://docs.fastvue.co/fastvue/syslog/api/2.0/ "Fastvue Syslog API") to see the data Fastvue Syslog can provide and how to call it.
