"C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe" -verb:sync -source:contentPath='%~dp0dist' -dest:contentPath='Default Web Site\uicomponent',ComputerName="192.168.0.200",UserName="Administrator",Password="1qaz@WSX",AuthType="NTLM" -allowUntrusted